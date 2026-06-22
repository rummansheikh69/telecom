import React from "react";
import Stars from "../ratings/Stars";
import { Link } from "react-router-dom";
import { FaRegCreditCard } from "react-icons/fa6";
import Loader from "../skeletons/Loader";
import { VscVerifiedFilled } from "react-icons/vsc";

function ProfileCard() {
  return (
    <div className="bg-subMain rounded-2xl p-4 shadow-lg border relative flex flex-col items-center sm:items-start">
      {/* credit card icon */}
      {/* <div className=" absolute top-2 right-3">
        <FaRegCreditCard className=" text-secondary" size={24} />
        {/* <Loader size={24} /> */}
      {/* </div> */}
      {/* credit card icon end */}

      <div className="flex items-center gap-2 w-full ">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full border-2 border-secondary p-[2px] bg-gray-200 flex-shrink-0 relative">
          {/* verify badge  */}
          <VscVerifiedFilled className=" absolute -top-1 bg-white rounded-full  right-0 mx-auto text-secondary size-5" />
          {/* verify badge end */}
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className=" gap-1 flex justify-between ">
          {/* User Info */}
          <div className=" ">
            <h2 className="text-lg font-bold text-gray-800">Md Rony Khan</h2>
            <p className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              BALANCE: 1000.00৳
            </p>
            <Stars rating={4.5} reviewCount={120} />
          </div>

          <div className=" ml-2 sm:ml-6 mt-1  ">
            <Link to={"/levels"}>
              <p>
                LV: <span>1</span>
              </p>
            </Link>

            <p className=" text-sm">
              UID: <span className=" uppercase">u1013</span>
            </p>

            <div className=" flex items-center gap-1">
              <p className=" uppercase text-sm text-textPrimary font-light">
                b(100)
              </p>
              <p className=" uppercase text-sm text-textPrimary font-light">
                s(100)
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full mt-4">
        <Link to="/add-money" className="w-6/12">
          <button className="bg-secondary text-white py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-secondary/95 transition w-full">
            Add Balance
          </button>
        </Link>
        <Link to={"p2p"} className="w-4/12">
          <button className="bg-secondary text-white py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-secondary/95 transition w-full ">
            P to P
          </button>
        </Link>
        <button className="bg-secondary text-white py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-secondary/95 transition w-2/12 flex items-center justify-center">
          <FaRegCreditCard className=" text-white" size={24} />
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
