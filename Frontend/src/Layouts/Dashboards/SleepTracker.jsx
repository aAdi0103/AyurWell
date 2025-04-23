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
  console.log(userId)
  useEffect(() => {
    if (!userId) return;

    const fetchSleepData = async () => {
      try {
        const res = await axiosInstance.get(`/sleep-data/data/${userId}`);
        const aggregated = aggregateSleepData(res.data);
        setSleepData(aggregated);
        console.log("Aggregated Sleep Data:", aggregated);
      } catch (error) {
        console.error("Failed to fetch sleep data:", error);
        // Fallback dummy data
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
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Sleep Tracker</h3>
      <div className="h-60 w-[30vw] bg-gray-100 rounded-lg flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sleepData}
            margin={{ top: 20, right: 8, left: -30, bottom: 0 }}
          >
            <XAxis dataKey="date" fontSize={10} angle={-30} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#60A5FA" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SleepTracker;
