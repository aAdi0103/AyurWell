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

// Aggregate sleep data by date (summing hours)
const aggregateSleepData = (data) => {
  const map = new Map();
  for (const item of data) {
    const formattedDate = formatDateToDay(item.date);
    const existing = map.get(formattedDate) || 0;
    map.set(formattedDate, existing + item.hours);
  }
  return Array.from(map, ([date, hours]) => ({ date, hours }));
};

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState([]);
  const { authUser } = useAuth();
  const userId = authUser?._id;
  // console.log(userId)

  useEffect(() => {
    if (!userId) return;

    const fetchSleepData = async () => {
      try {
        const res = await axiosInstance.get(`/sleep-data/data/${userId}`);
        const aggregated = aggregateSleepData(res.data);
        setSleepData(aggregated);
        // console.log("Aggregated Sleep Data:", aggregated);
      } catch (error) {
        console.error("Failed to fetch sleep data:", error);
        setSleepData([
          { date: "Mon Apr 15", hours: 6 },
          { date: "Tue Apr 16", hours: 7 },
          { date: "Wed Apr 17", hours: 5 },
          { date: "Thu Apr 18", hours: 8 },
          { date: "Fri Apr 19", hours: 6.5 },
          { date: "Sat Apr 20", hours: 7.2 },
          { date: "Sun Apr 21", hours: 6.8 },
        ]);
      }
    };

    fetchSleepData();
  }, [userId]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-100 p-6 rounded-2xl shadow-lg border">
      <h3 className="text-2xl font-bold mb-4 text-center text-indigo-700">
        💤 Sleep Tracker
      </h3>
      <div className="h-72 w-full bg-white rounded-xl flex items-center justify-center shadow-inner p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sleepData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date"
              fontSize={12}
              angle={-30}
              textAnchor="end"
              tick={{ fill: "#4B5563", fontWeight: 600 }}
            />
            <YAxis
              label={{ value: "Hours", angle: -90, position: "insideLeft", fill: "#6B7280" }}
              tick={{ fill: "#4B5563", fontWeight: 600 }}
            />
            <Tooltip contentStyle={{ 
              backgroundColor: "#E0F7FA", 
              borderRadius: "12px", 
              border: "none",
              color: "#4B5563", 
              fontWeight: 600 
            }} />
            <Bar
              dataKey="hours"
              fill="#A78BFA"  // Light purple color to fit the theme
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SleepTracker;
