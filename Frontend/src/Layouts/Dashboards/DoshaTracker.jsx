import React, { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { axiosInstance } from "../../lib/axios";
import { useAuth } from "../../Context/AuthContext";

const DoshaTracker = () => {
  const [doshaData, setDoshaData] = useState([]);
  const { authUser } = useAuth();
  const userId = authUser?._id;

  useEffect(() => {
    const fetchDoshaData = async () => {
      try {
        const res = await axiosInstance.get(`/dosha-profile/data/${userId}`);
        const { doshaProfile } = res.data;

        const formattedData = [
          { type: "Vata", value: doshaProfile.vata ?? 0 },
          { type: "Pitta", value: doshaProfile.pitta ?? 0 },
          { type: "Kapha", value: doshaProfile.kapha ?? 0 },
        ];

        setDoshaData(formattedData);
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
  }, [userId]);

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl shadow-lg border">
      <h3 className="text-2xl font-bold mb-4 text-center text-indigo-700">
        🌿 Dosha Tracker
      </h3>
      <div className="h-72 w-full bg-white rounded-xl flex items-center justify-center shadow-inner p-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={doshaData}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis dataKey="type" tick={{ fill: "#4B5563", fontSize: 14, fontWeight: 600 }} />
            <PolarRadiusAxis domain={[0, 2]} />
            <Tooltip contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: "8px", border: "none" }} />
            <Radar
              name="Dosha Levels"
              dataKey="value"
              stroke="#7C3AED"
              fill="#7C3AED"
              fillOpacity={0.4}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoshaTracker;
