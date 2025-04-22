import React from 'react'
import First from './Dashboards/First'
import DoshaProfile from './Dashboards/DoshaProfile'
import Remedies from './Dashboards/Remedies'
import DietPlannar from './Dashboards/DietPlannar'
import Yoga from './Dashboards/Yoga'
import Quiz from './Dashboards/Quiz'

const DashboardMain = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'quiz' :return <Quiz/>
      case 'dashboard': return <First />
      case 'dosha-profile': return <DoshaProfile />
      case 'remedies': return <Remedies />
      case 'diet-planner': return <DietPlannar />
      case 'yoga': return <Yoga />
      default: return <div>Select a section</div>
    }
  }

  return (
    <div className="flex-1 p-6">
      {renderContent()}
    </div>
  );
};

export default DashboardMain;
