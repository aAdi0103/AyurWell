import React, { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import MobileMenu from './MobileMenu';
import DashboardMain from '../Layouts/DashboardMain';
 

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <MobileMenu onOpen={() => setShowSidebar(true)} />

      {/* Sidebar - Mobile Drawer */}
      {showSidebar && (
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isMobile={true}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content with left margin on large screens */}
      <div className="flex-grow sm:ml-[260px] p-4 overflow-auto">
        <DashboardMain activeSection={activeSection} />
      </div>
    </div>
  );
};

export default Dashboard;
