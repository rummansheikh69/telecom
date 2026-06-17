import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

function CoreGrid() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {/* Wallet */}
      <Link to={"/wallet"}>
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
      </Link>

      {/* Today's Update */}
      <Link to={"/updates"}>
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
      </Link>

      {/* Deals*/}
      <Link to={"/deals"}>
        <div className="bg-subMain rounded-2xl p-4 shadow-lg flex items-center justify-center flex-col gap-4">
          <div className=" ">
            <FaCirclePlus size={48} className="text-secondary" />
          </div>
          <p className="text-base text-primary font-medium"> Deal</p>
        </div>
      </Link>
    </div>
  );
}

export default CoreGrid;
