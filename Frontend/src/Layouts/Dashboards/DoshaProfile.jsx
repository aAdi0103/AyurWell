import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"; // Importing PieChart and Pie
import { axiosInstance } from "../../lib/axios";
import { useAuth } from "../../Context/AuthContext";

const COLORS = ["#F59E0B", "#10B981", "#6366F1"]; // Vata, Pitta, Kapha

const DoshaProfile = () => {
  const [doshaData, setDoshaData] = useState([]);
  const [prakriti, setPrakriti] = useState("");  // State to store prakriti
  const [insight, setInsight] = useState("");  // State to store insight
  const { authUser } = useAuth();
  const userId = authUser?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchDoshaProfile = async () => {
      try {
        const res = await axiosInstance.get(`/dosha-profile/data/${userId}`);
        console.log("API Response:", res.data);  // Log the entire response to see the structure

        const { doshaProfile, prakriti, insight } = res.data;  // Accessing doshaProfile, prakriti, and insight
        
        const { vata, pitta, kapha } = doshaProfile;

        // Check for undefined values and replace them with 0 or a default value
        const formattedData = [
          { name: "Vata", value: vata ?? 0 },
          { name: "Pitta", value: pitta ?? 0 },
          { name: "Kapha", value: kapha ?? 0 },
        ];

        setDoshaData(formattedData);
        setPrakriti(prakriti);  // Set prakriti value
        setInsight(insight);  // Set insight value
      } catch (error) {
        console.error("Failed to fetch dosha profile:", error);

        // Dummy fallback data
        setDoshaData([
          { name: "Vata", value: 35 },
          { name: "Pitta", value: 45 },
          { name: "Kapha", value: 20 },
        ]);
        setPrakriti("Balanced");  // Fallback value for prakriti
        setInsight("Your dosha profile suggests a balanced constitution with an affinity for adaptability and energy.");
      }
    };

    fetchDoshaProfile();
  }, [userId]);

  console.log("Dosha Data:", doshaData);

  return (
    <div className="flex gap-16 bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg border border-blue-700 p-8 rounded-xl transform hover:scale-105 transition duration-500">
      {/* Pie Chart */}
      <div className="flex justify-center items-center w-full max-w-lg bg-white rounded-xl shadow-xl p-6">
        <ResponsiveContainer width="90%" height={400}>
          <PieChart>
            <Pie
              data={doshaData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="90%"
              fill={COLORS[0]}
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

      {/* Dosha Info */}
      <div className="flex flex-col justify-center text-white space-y-6">
        <h3 className="text-4xl font-extrabold text-gray-100">{prakriti}</h3>
        <p className="text-xl font-semibold text-gray-200">{insight}</p>

        {/* Render Prakriti and Insight */}
        <div className="mt-6 space-y-4">
          <p className="text-2xl font-medium"><strong>Prakriti: </strong>{prakriti}</p>
          <p className="text-xl mt-2 text-gray-200">{insight}</p>
        </div>
      </div>
    </div>
  );
};

export default DoshaProfile;
