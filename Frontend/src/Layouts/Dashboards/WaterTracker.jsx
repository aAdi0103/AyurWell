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

const WaterTracker = () => {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const res = await axiosInstance.get("/api/water-data");
        setWaterData(res.data);
      } catch (error) {
        console.error("Failed to fetch water data:", error);
        // fallback hardcoded data
        setWaterData([
          { date: "2025-04-15", liters: 1.2 },
          { date: "2025-04-16", liters: 1.5 },
          { date: "2025-04-17", liters: 2.0 },
          { date: "2025-04-18", liters: 1.8 },
          { date: "2025-04-19", liters: 2.2 },
          { date: "2025-04-20", liters: 1.9 },
          { date: "2025-04-21", liters: 2.1 },
        ]);
      }
    };

    fetchWaterData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Water Tracker</h3>
      <div className="h-60 w-[30vw] bg-gray-100 rounded-lg flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis dataKey="date" fontSize={10} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="liters" fill="#38BDF8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaterTracker;
