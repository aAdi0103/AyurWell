import React from "react";

const DashboardMain = () => {
  return (
    <div className="p-6 bg-[#f5f0e9] min-h-screen text-[#3e3e3e] font-sans">
      <div className="flex items-center justify-between mb-6">
       <div> <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <h2 className="text-xl mb-4">Welcome back, Shreyas</h2>
        </div>
         {/* Challenge Progress */}
         <div className="bg-black p-4 rounded-xl shadow-sm border">
  <h3 className="font-semibold mb-2 text-white">Challenge Progress</h3>
  <p className="text-orange-700">5 Days into No Sugar Challenges</p>
             </div>


      </div>
     
      {/* Suggestion Card */}
      <div className="bg-[#fef3e7] border border-[#e0d5c2] rounded-xl p-4 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-orange-200 p-2 rounded-full">🧘</div>
          <p>Try a cup of Trikatu tea at night to help with your sluggish digestion.</p>
        </div>
        <button className="text-xl">{">"}</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
  {/* Dosha Balance */}
  <div className="bg-white p-4 rounded-xl shadow-sm border">
    <h3 className="font-semibold mb-2">Dosha Balance</h3>
    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
      Radar Chart Placeholder
    </div>
  </div>

  {/* Sleep Tracker */}
  <div className="bg-white p-4 rounded-xl shadow-sm border">
    <h3 className="font-semibold mb-2">Sleep Tracker</h3>
    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
      Bar Chart Placeholder
    </div>
  </div>

  {/* Water Intake */}
  <div className="bg-white p-4 rounded-xl shadow-sm border">
    <h3 className="font-semibold mb-2">Sleep Tracker</h3>
    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
      Bar Chart Placeholder
    </div>
  </div>

  {/* Wellness Insights */}
  <div className="bg-white p-4 rounded-xl shadow-sm border">
    <h3 className="font-semibold mb-2">Wellness Insights</h3>
    <p className="text-sm text-gray-600">Community Trends deary Geneass selorial outinfo</p>
  </div>

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
