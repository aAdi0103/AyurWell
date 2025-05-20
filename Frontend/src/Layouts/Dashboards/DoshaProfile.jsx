import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { axiosInstance } from "../../lib/axios";
import { useAuth } from "../../Context/AuthContext";

const COLORS = ["#F59E0B", "#10B981", "#6366F1"]; // Vata, Pitta, Kapha colors

const DoshaProfile = () => {
  const [doshaData, setDoshaData] = useState([]);
  const [prakriti, setPrakriti] = useState("");
  const [insights, setInsight] = useState("");
  const [qualities, setQualities] = useState([]);
  const { authUser } = useAuth();
  const userId = authUser?._id;
  console.log(authUser);

  useEffect(() => {
    if (!userId) return;

    const fetchDoshaProfile = async () => {
      try {
        const res = await axiosInstance.get(`/dosha-profile/data/${userId}`);

        console.log("API Response:", res.data);  // Log the entire response to see the structure
      
        const { doshaProfile, prakriti, insight,qualities } = res.data;
        const { vata, pitta, kapha } = doshaProfile;

        const formattedData = [
          { name: "Vata", value: vata ?? 0 },
          { name: "Pitta", value: pitta ?? 0 },
          { name: "Kapha", value: kapha ?? 0 },
        ];

        setDoshaData(formattedData);
        setPrakriti(prakriti);
        setInsight(insight);
        setQualities(qualities);
      } catch (error) {
        console.error("Failed to fetch dosha profile:", error);
        setDoshaData([
          { name: "Vata", value: 35 },
          { name: "Pitta", value: 45 },
          { name: "Kapha", value: 20 },
        ]);
        setPrakriti("Balanced");
        setInsight("Your dosha profile suggests a balanced constitution with an affinity for adaptability and energy.");
      }
    };

    fetchDoshaProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-10 min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 p-8 rounded-2xl shadow-lg border border-gray-300 transition-transform">
      
      {/* Pie Chart Section */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white rounded-xl p-8 shadow-xl">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={doshaData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {doshaData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-indigo-700">{prakriti}</h2>
        <p className="text-xl text-gray-700 leading-relaxed">{insights}</p>

        <div className="mt-6 space-y-2">
          <div className="text-xl font-semibold text-indigo-600">
            <span className="text-blue-700">Qualities of </span> {prakriti} :
          </div>
          <div className="text-gray-600 text-lg flex gap-1">
  {qualities.map((quality, index) => (
    <span key={index}>{quality},</span>
  ))}
</div>

        </div>
      </div>

    </div>
  );
};

export default DoshaProfile;
