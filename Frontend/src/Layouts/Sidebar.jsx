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
  { label: "Community & Challenges", icon: <Users />, section: "community" },
  { label: "Consultation", icon: <Stethoscope />, section: "consultation" },
  { label: "Reports & Insights", icon: <BarChart3 />, section: "reports" }
];

const Sidebar = ({ activeSection, onSectionChange }) => {
 
  return (
    <div className="w-[26vw] bg-[#456345] text-white min-h-screen px-4 py-6">
      {/* Logo & Title */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🌿</span>
        <h1 className="text-2xl font-semibold tracking-wide">AyuPath</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.section;
console.log(`Active Section: ${activeSection}, Current Item: ${item.section}`);
          return (
            <div
              key={index}
              onClick={() => onSectionChange(item.section)}
              className={`flex items-center gap-3 px-4 py-[1.3vw] rounded-lg text-sm cursor-pointer transition-all
              ${isActive ? "bg-green-700 text-white" : "hover:bg-green-600 text-gray-300 hover:text-white"}`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-[1.2vw] font-semibold">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
