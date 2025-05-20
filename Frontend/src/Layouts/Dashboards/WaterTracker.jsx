import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { axiosInstance } from "../../lib/axios";
import { useAuth } from "../../Context/AuthContext";

// Format date to readable format like "Mon Apr 22"
const formatDateToDay = (dateString) => {
  const options = { weekday: "short", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Aggregate water intake data by date (summing liters)
const aggregateWaterData = (data) => {
  const map = new Map();
  for (const item of data) {
    const formattedDate = formatDateToDay(item.date);
    const existing = map.get(formattedDate) || 0;
    map.set(formattedDate, existing + item.liters);
  }
  return Array.from(map, ([date, liters]) => ({ date, liters }));
};

const WaterTracker = () => {
  const [waterData, setWaterData] = useState([]);
  const { authUser } = useAuth();
  const userId = authUser?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchWaterData = async () => {
      try {
        const res = await axiosInstance.get(`/water/data/${userId}`);
        const aggregated = aggregateWaterData(res.data);
        setWaterData(aggregated);
        // console.log("Aggregated water data:", aggregated);
      } catch (error) {
        console.error("Failed to fetch water data:", error);
        setWaterData([
          { date: "Mon Apr 15", liters: 1.5 },
          { date: "Tue Apr 16", liters: 2 },
          { date: "Wed Apr 17", liters: 1.2 },
          { date: "Thu Apr 18", liters: 2.5 },
          { date: "Fri Apr 19", liters: 1.8 },
          { date: "Sat Apr 20", liters: 2.3 },
          { date: "Sun Apr 21", liters: 2.1 },
        ]);
      }
    };

    fetchWaterData();
  }, [userId]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg border">
      <h3 className="text-2xl font-bold text-cyan-600 mb-1 text-center">💧 Water Tracker</h3>
      <p className="text-sm text-gray-500 mb-4 text-center">Daily Intake (Liters)</p>

      <div className="h-64 w-full rounded-lg flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
            <XAxis 
              dataKey="date" 
              fontSize={11} 
              angle={-30} 
              textAnchor="end" 
              tick={{ fill: "#0E7490", fontWeight: 600 }}
            />
            <YAxis 
              label={{ value: "Liters", angle: -90, position: "insideLeft", fill: "#0891B2" }}
              tick={{ fill: "#0E7490", fontWeight: 600 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#F0FDFA", 
                borderRadius: "8px", 
                border: "none",
                color: "#0E7490",
                fontWeight: 600 
              }} 
              cursor={{ fill: "rgba(14, 116, 144, 0.1)" }}
            />
            <Bar 
              dataKey="liters" 
              fill="#22D3EE" 
              radius={[8, 8, 0, 0]} 
              barSize={40}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaterTracker;
