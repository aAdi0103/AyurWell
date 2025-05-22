import React, { useEffect, useState } from "react";
import { axiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import SleepTracker from "./SleepTracker";
import WaterTracker from "./WaterTracker";
import DoshaTracker from "./DoshaTracker";
import Insights from "./Insights";
import { useAuth } from "../../Context/AuthContext";
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight,LogOut  } from 'lucide-react';


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
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  if (!authUser) return <div>Loading or Unauthorized...</div>;

  return (
    <div className="p-4 bg-[#f5f0e9] min-h-screen text-[#3e3e3e] font-sans">
      <div className="flex p-2 items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <h2 className="text-xl mb-4">Welcome back, {authUser.name}</h2>         
        </div>

        <div className="rounded-xl shadow-sm border flex items-center justify-center">
  <button
    onClick={handleLogout}
    className="flex items-center bg-black gap-2 px-4 py-3 text-white hover:text-white hover:bg-red-500 font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
  >
    <LogOut size={20} />
    Logout
  </button>
</div>
      </div>

      {/* Suggestion Card */}
      <div className="bg-[#fef3e7] border border-[#e0d5c2] rounded-xl p-4 flex items-center justify-between mb-3 transition-all duration-500 ease-in-out">
  <div className="flex flex-col gap-2">
    <p className="font-bold text-orange-900">Today's Tip</p>
    <div className="flex items-center gap-3">
      <div className="bg-orange-200 p-2 rounded-full text-2xl">🧘</div>
      <p className="text-gray-800 transition-opacity duration-500 max-w-">{suggestions[currentIndex]}</p>
    </div>
  </div>

  {/* Navigation Icons from lucide-react */}
  <div className="flex items-center gap-2">
    <button
      onClick={() => setCurrentIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)}
      className="text-orange-700 hover:text-orange-900 p-2 rounded-full bg-orange-100 hover:bg-orange-300 transition-all duration-300"
    >
      <ChevronLeft size={28} />
    </button>
    <button
      onClick={() => setCurrentIndex((prev) => (prev + 1) % suggestions.length)}
      className="text-orange-700 hover:text-orange-900 p-2 rounded-full bg-orange-100 hover:bg-orange-300 transition-all duration-300"
    >
      <ChevronRight size={28} />
    </button>
  </div>
</div>



      <div className="grid lg:grid-cols-2 gap-6">
        <DoshaTracker />
        <SleepTracker />
        <WaterTracker />
        <Insights />
      </div>
    </div>
  );
};

export default DashboardMain;
