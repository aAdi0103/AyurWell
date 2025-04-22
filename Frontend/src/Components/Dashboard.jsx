import React, { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import DashboardMain from '../Layouts/DashboardMain';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // default section

  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <DashboardMain activeSection={activeSection} />
    </div>
  );
};

export default Dashboard;
