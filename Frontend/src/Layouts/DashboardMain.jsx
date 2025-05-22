import React from 'react'
import First from './Dashboards/First'
import DoshaProfile from './Dashboards/DoshaProfile'
import Remedies from './Dashboards/Remedies'
import DietPlannar from './Dashboards/DietPlannar'
import Yoga from './Dashboards/Yoga'
import Quiz from './Dashboards/Quiz'
import DailyTracker from './Dashboards/DailyTracker'
import Constation from './Dashboards/Constation'
 import Community from './Dashboards/Community'
 import Report from './Dashboards/Report'
const DashboardMain = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'quiz' :return <Quiz/>
      case 'dashboard': return <First />
      case 'dosha-profile': return <DoshaProfile />
      case 'remedies': return <Remedies />
      case 'diet-planner': return <DietPlannar />
      case 'yoga': return <Yoga />
      case 'tracker': return <DailyTracker />
      case 'consultation': return <Constation />
      case 'community':return <Community/>
      case 'report':return <Report/>
      
      default: return <div>Select a section</div>
    }
  }

  return (
    <div className="flex-1 p-1 ">
      {renderContent()}
    </div>
  );
};

export default DashboardMain;
