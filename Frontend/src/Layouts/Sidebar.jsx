import { label } from "framer-motion/client";
import {
  LayoutDashboard,
  HeartPulse,
  Leaf,
  Salad,
  PersonStanding,
  CalendarCheck,
  Users,
  Stethoscope,
  BarChart3
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: <LayoutDashboard />, section: "dashboard" },
  { label: "Quiz", icon: <BarChart3 />, section: "quiz" },
  { label: "My Dosha Profile", icon: <HeartPulse />, section: "dosha-profile" },
  { label: "Remedies & Treatments", icon: <Leaf />, section: "remedies" },
  { label: "Diet Planner", icon: <Salad />, section: "diet-planner" },
  { label: "Yoga & Meditation", icon: <PersonStanding />, section: "yoga" },
  { label: "Daily Tracker", icon: <CalendarCheck />, section: "tracker" },
  { label: "Community", icon: <Users />, section: "community" },
  { label: "Consultation", icon: <Stethoscope />, section: "consultation" },
  { label: "Reports & Insights", icon: <BarChart3 />, section: "report" }
  
];

const Sidebar = ({ activeSection, onSectionChange, isMobile = false, onClose = () => {} }) => {
  return (
    <div
      className={`bg-[#456345] text-white h-screen px-4 py-6 w-[260px] flex-shrink-0 z-40
      ${isMobile ? "fixed top-0 left-0 shadow-lg sm:hidden" : "fixed top-0 left-0 hidden sm:block"}`}
    >
      {/* Logo & Close */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌿</span>
          <h1 className="text-2xl font-semibold tracking-wide">AyuPath</h1>
        </div>
        {isMobile && (
          <button onClick={onClose} className="text-white text-2xl">&times;</button>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-2 overflow-y-auto hide-scrollbar h-[calc(100vh-100px)]">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.section;
// console.log(`Active Section: ${activeSection}, Current Item: ${item.section}`);
          return (
            <div
              key={index}
              onClick={() => {
                onSectionChange(item.section);
                if (isMobile) onClose();
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm cursor-pointer transition-all
              ${isActive ? "bg-green-700 text-white" : "hover:bg-green-600 text-gray-300 hover:text-white"}`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-base font-semibold">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
