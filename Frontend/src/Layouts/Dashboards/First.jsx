import React from "react";

import { axiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom'; // 👈 import
import SleepTracker from "./Sleeptracker";
import WaterTracker from "./WaterTracker";
import DoshaTracker from "./DoshaTracker";
import Insights from "./Insights";
 import { useAuth } from "../../Context/AuthContext";
const DashboardMain = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
console.log(authUser,"authUser");

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setAuthUser(null);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  };

  if (!authUser) return <div>Loading or Unauthorized...</div>;
  return (
    <div className="p-4 bg-[#f5f0e9] min-h-screen text-[#3e3e3e] font-sans">
      <div className="flex p-2 items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <h2 className="text-xl mb-4">Welcome back, {authUser.name}</h2>
          <button
            onClick={handleLogout}
            className="block w-full px-3 py-2 text-left font-bold text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>
        {/* Challenge Progress */}
        <div className="bg-black p-3 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2 text-white">Challenge Progress</h3>
          <p className="text-orange-700">5 Days into No Sugar Challenges</p>
        </div>
      </div>

      {/* Suggestion Card */}
      <div className="bg-[#fef3e7] border border-[#e0d5c2] rounded-xl p-4 flex items-center justify-between mb-3">
        <div className="flex flex-col gap-2">
          <p className="font-bold">Today's Tip</p>
          <div className="flex items-center gap-3">
          <div className="bg-orange-200 p-1 rounded-full">🧘</div>
          <p>Try a cup of Trikatu tea at night to help with your sluggish digestion.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Dosha Balance */}
      <DoshaTracker/>

        {/* Sleep Tracker */}
        <SleepTracker />
        <WaterTracker/>

        {/* Wellness Insights */}
      <Insights/>

        {/* Community Trends */}
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Community Trends Nearby</h3>
          <p className="text-sm text-gray-600">Users in your area are reporting heat rashes</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;