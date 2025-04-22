import React, { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { axiosInstance } from "../../lib/axios";

const DoshaTracker = () => {
  const [doshaData, setDoshaData] = useState([]);

  useEffect(() => {
    const fetchDoshaData = async () => {
      try {
        const res = await axiosInstance.get("/api/dosha-data");
        setDoshaData(res.data);
      } catch (error) {
        console.error("Failed to fetch dosha data:", error);
        // fallback hardcoded data
        setDoshaData([
          { type: "Vata", value: 60 },
          { type: "Pitta", value: 75 },
          { type: "Kapha", value: 45 },
        ]);
      }
    };

    fetchDoshaData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-2">Dosha Tracker</h3>
      <div className="h-60 w-[30vw] bg-gray-100 rounded-lg flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={doshaData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Tooltip />
            <Radar
              name="Dosha Levels"
              dataKey="value"
              stroke="#6366F1"
              fill="#6366F1"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoshaTracker;
