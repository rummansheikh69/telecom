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

      {/* promotions */}
      <div className=" col-span-2 bg-subMain rounded-2xl  shadow-md"></div>
      {/* promotions end */}
    </div>
  );
}

export default CoreGrid;
