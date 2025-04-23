import React, { useEffect, useState } from "react";
import { axiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import SleepTracker from "./SleepTracker";
import WaterTracker from "./WaterTracker";
import DoshaTracker from "./DoshaTracker";
import Insights from "./Insights";
import { useAuth } from "../../Context/AuthContext";
import { toast } from 'react-toastify';

const DashboardMain = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setAuthUser(null);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  };

  const suggestions = [
    "Try a cup of Trikatu tea at night to help with your sluggish digestion.",
    "Start your day with warm water and lemon to stimulate digestion.",
    "Avoid cold drinks during meals to keep your digestive fire strong.",
    "Practice deep breathing for 5 minutes to reduce stress-related cravings.",
    "Chew your food thoroughly to aid in better digestion and nutrient absorption.",
    "Incorporate turmeric in your meals to reduce inflammation.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % suggestions.length);
    }, 3000); // change tip every 12 seconds

    return () => clearInterval(interval);
  }, []);

  if (!authUser) return <div>Loading or Unauthorized...</div>;

  return (
    <div className="p-4 bg-[#f5f0e9] min-h-screen text-[#3e3e3e] font-sans">
      <div className="flex p-2 items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <h2 className="text-xl mb-4">Welcome back, Aditya</h2>
          <button
            onClick={handleLogout}
            className="block w-full px-3 py-2 text-left font-bold text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>

        <div className="bg-black p-3 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2 text-white">Challenge Progress</h3>
          <p className="text-orange-700">5 Days into No Sugar Challenges</p>
        </div>
      </div>

      {/* Suggestion Card */}
      <div className="bg-[#fef3e7] border border-[#e0d5c2] rounded-xl p-4 flex items-center justify-between mb-3 transition-all duration-500 ease-in-out">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-orange-900">Today's Tip</p>
          <div className="flex items-center gap-3">
            <div className="bg-orange-200 p-1 rounded-full">🧘</div>
            <p className="text-gray-800 transition-opacity duration-500">{suggestions[currentIndex]}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <DoshaTracker />
        <SleepTracker />
        <WaterTracker />
        <Insights />

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Community Trends Nearby</h3>
          <p className="text-sm text-gray-600">Users in your area are reporting heat rashes</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
