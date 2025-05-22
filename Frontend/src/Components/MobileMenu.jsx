import { Menu } from "lucide-react";

const MobileMenu = ({ onOpen }) => {
  return (
    <div className="sm:hidden fixed top-4 left-4 z-50">
      <button onClick={onOpen} className="bg-[#456345] text-white p-2 rounded-lg shadow-md">
        <Menu size={24} />
      </button>
    </div>
  );
};

export default MobileMenu;
