import { HiOutlineSearch } from "react-icons/hi";
import { MdNotifications } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import Stars from "../components/ratings/Stars";
import { FaCirclePlus } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";

function HomePage() {
  return (
    <div className="h-screen w-full bg-main flex flex-col overflow-y-auto">
      {/* 1. Blue Header Background with Rounded Bottom Corners */}
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

      {/* 2. Content Container (Shifted Upwards to Overlap) */}
      <div className="px-4 -mt-10 flex-1">
        {/* Profile Card */}
        <div className="bg-subMain rounded-2xl p-4 shadow-lg border  flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-4 w-full">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full border-2 border-secondary p-[2px] bg-gray-200 overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* User Info */}
            <div>
              <h2 className="text-lg font-bold text-gray-800">Md Rony Khan</h2>
              <p className="text-sm font-semibold text-gray-600">
                BALANCE: 1000.00৳
              </p>
              <Stars rating={4.5} reviewCount={120} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full mt-4">
            <button className="bg-secondary text-white py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-secondary/95 transition">
              Add Balance
            </button>
            <button className="bg-secondary text-white py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-secondary/95 transition">
              P to P
            </button>
          </div>
        </div>

        {/* Grid items (Wallet, Today's Update, etc.) would go right underneath here */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {/* Wallet */}
          <div className="bg-secondary rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
            <div className=" size-14">
              <img
                src="images/wallet.svg"
                alt="wallet"
                className=" w-full h-full object-contain"
              />
            </div>
            <p className="text-base text-white font-medium">Wallet</p>
          </div>

          {/* Today's Update */}
          <div className="bg-subMain rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
            <div className=" size-14">
              <img
                src="images/newspaper.png"
                alt="today's update"
                className=" w-full h-full object-contain mt-1"
              />
            </div>
            <p className="text-base text-primary font-medium"> Update's</p>
          </div>

          {/* Deals*/}
          <div className="bg-subMain rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
            <div className=" ">
              <FaCirclePlus size={48} className="text-secondary" />
            </div>
            <p className="text-base text-primary font-medium"> Deal</p>
          </div>
        </div>

        {/* Grid items (Saree, Scammer Community, etc.) would go right underneath here */}
        <div className="mt-6 grid grid-cols-4 gap-2">
          {/* Saree */}
          <div className="bg-subMain rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
            <div className=" size-10">
              <img
                src="images/saree.png"
                alt="wallet"
                className=" w-full h-full object-contain"
              />
            </div>
            <p className="text-base text-primary font-medium">Saree</p>
          </div>

          {/* Digital */}
          <div className="bg-subMain rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
            <div className=" size-10">
              <img
                src="images/mobile.png"
                alt="today's update"
                className=" w-full h-full object-contain mt-2"
              />
            </div>
            <p className="text-base text-primary font-medium text-center leading-5">
              Digital Product
            </p>
          </div>

          {/* Sim */}
          <div className="bg-subMain rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
            <div className=" size-10">
              <img
                src="images/sim.png"
                alt="today's update"
                className=" w-full h-full object-contain mt-2"
              />
            </div>
            <p className="text-base text-primary font-medium text-center leading-5">
              SIM Offers
            </p>
          </div>

          {/* scammers */}
          <div className="bg-subMain rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
            <div className=" size-10">
              <img
                src="images/scammer.png"
                alt="today's update"
                className=" w-full h-full object-contain mt-2 ml-1"
              />
            </div>
            <p className="text-base text-primary font-medium text-center leading-5">
              Scammer Checker
            </p>
          </div>
        </div>

        {/* Grid items (Rules, Verify, Officer, etc.) would go right underneath here */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {/* doc */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8">
              <img
                src="images/doc.svg"
                alt="wallet"
                className=" w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-primary font-medium">Rules</p>
          </div>

          {/* Verify */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8 flex items-center justify-center">
              <MdVerifiedUser size={32} className=" text-secondary" />
            </div>
            <p className="text-sm text-primary font-medium">Verify</p>
          </div>

          {/* Officer */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8 flex items-center justify-center">
              <FaUser size={32} className=" text-secondary" />
            </div>
            <p className="text-sm text-primary font-medium">Officer</p>
          </div>

          {/* chat */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8 flex items-center justify-center">
              <IoChatbubbleEllipsesSharp
                size={32}
                className=" text-secondary"
              />
            </div>
            <p className="text-sm text-primary font-medium">Chat</p>
          </div>

          {/* helpline */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8 flex items-center justify-center">
              <PiPhoneCallFill size={32} className=" text-secondary" />
            </div>
            <p className="text-sm text-primary font-medium">Helpline</p>
          </div>

          {/* admission */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8 flex items-center justify-center">
              <FiPlus size={32} className=" text-secondary" />
            </div>
            <p className="text-sm text-primary font-medium">Admit</p>
          </div>

          {/* balance */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8">
              <img
                src="images/money.svg"
                alt="wallet"
                className=" w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-primary font-medium">Balance</p>
          </div>

          {/* admission */}
          <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
            <div className=" size-8 flex items-center justify-center">
              <GoStarFill size={32} className=" text-secondary" />
            </div>
            <p className="text-sm text-primary font-medium">Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
