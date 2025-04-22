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

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const res = await axiosInstance.get("/api/sleep-data");
        setSleepData(res.data);
      } catch (error) {
        console.error("Failed to fetch sleep data:", error);
        // fallback to hardcoded data
        setSleepData([
          { date: "2025-04-15", hours: 6 },
          { date: "2025-04-16", hours: 7 },
          { date: "2025-04-17", hours: 5 },
          { date: "2025-04-18", hours: 8 },
          { date: "2025-04-19", hours: 6.5 },
          { date: "2025-04-20", hours: 7.2 },
          { date: "2025-04-21", hours: 6.8 },
        ]);
      }
    };

    fetchSleepData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Sleep Tracker</h3>
      <div className="h-60 w-[30vw] bg-gray-100 rounded-lg flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sleepData}
            margin={{ top: 20, right: 8, left: -30, bottom: 0 }}
          >
            <XAxis dataKey="date" fontSize={10} />
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
