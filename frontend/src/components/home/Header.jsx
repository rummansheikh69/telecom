import { HiOutlineSearch } from "react-icons/hi";
import { MdNotifications } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

function Header() {
  return (
    <div className="bg-secondary text-white px-4 pt-6 pb-16 shadow-sm">
      {/* Top Navbar Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center">
          <span className="font-bold text-xl tracking-wide">বাংলাদেশী</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white/20 text-white placeholder-white/70 pl-4 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
            <HiOutlineSearch size={20} />
          </span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <span className="text-xl">
              <MdNotifications size={24} />
            </span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <span className="text-xl cursor-pointer">
            <FiMenu size={24} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
