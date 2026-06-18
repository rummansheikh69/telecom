import React from "react";
import { Link } from "react-router-dom";

function SecondGrid() {
  return (
    <div className="mt-5 grid grid-cols-4 gap-2">
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
      <Link to={"/scammers"}>
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
      </Link>
    </div>
  );
}

export default SecondGrid;
