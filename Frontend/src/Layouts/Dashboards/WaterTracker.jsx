import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
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
        console.log("Aggregated water data:", aggregated);
      } catch (error) {
        console.error("Failed to fetch water data:", error);
        // Fallback dummy data
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
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Water Tracker</h3>
      <div className="h-60 w-[30vw] rounded-lg flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterData}
            margin={{ top: 20, right: 8, left: -30, bottom: 0 }}
          >
            <XAxis dataKey="date" fontSize={10} angle={-30} textAnchor="end" />
            <YAxis label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="liters" fill="#34D399" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaterTracker;
