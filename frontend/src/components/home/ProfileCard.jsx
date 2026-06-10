import React from "react";
import Stars from "../ratings/Stars";
import { Link } from "react-router-dom";

function ProfileCard() {
  return (
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
        <div className=" gap-2 flex justify-between">
          {/* User Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">Md Rony Khan</h2>
            <p className="text-sm font-semibold text-gray-600">
              BALANCE: 1000.00৳
            </p>
            <Stars rating={4.5} reviewCount={120} />
          </div>

          <div>
            <Link to={"/levels"}>
              <p>
                LV: <span>1</span>
              </p>
            </Link>
          </div>
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
  );
}

export default ProfileCard;
