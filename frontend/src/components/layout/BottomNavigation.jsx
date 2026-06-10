import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

function BottomNavigation() {
  return (
    <div className=" w-full h-14 bg-subMain fixed mx-auto bottom-0 left-0 right-0 max-w-md flex items-center px-4 shadow-lg">
      <div className=" grid grid-cols-5 gap-4 w-full h-full">
        <NavLink to="/" className="w-full h-full">
          {({ isActive }) => (
            <div className="  w-full h-full flex items-center justify-center flex-col">
              <div>
                <AiFillHome
                  size={24}
                  className={isActive ? "text-secondary" : " text-textGry"}
                />
              </div>
              <p
                className={`text-sm  font-medium leading-tight ${isActive ? "text-secondary" : " text-textGry"}`}
              >
                Home
              </p>
            </div>
          )}
        </NavLink>

        <NavLink to="/wallet" className="w-full h-full">
          {({ isActive }) => (
            <div className="  w-full h-full flex items-center justify-center flex-col">
              <div>
                <MdOutlineAccountBalanceWallet
                  size={24}
                  className={isActive ? "text-secondary" : " text-textGry"}
                />
              </div>
              <p
                className={`text-sm  font-medium leading-tight ${isActive ? "text-secondary" : " text-textGry"}`}
              >
                Wallet
              </p>
            </div>
          )}
        </NavLink>

        <NavLink to="/deal" className="w-full h-full">
          {({ isActive }) => (
            <div className="  w-full h-full flex items-center justify-center flex-col">
              <div>
                <FaCirclePlus
                  size={44}
                  className={isActive ? "text-secondary" : " text-textGry"}
                />
              </div>
            </div>
          )}
        </NavLink>

        <NavLink to="/orders" className="w-full h-full">
          {({ isActive }) => (
            <div className="  w-full h-full flex items-center justify-center flex-col">
              <div>
                <MdOutlineShoppingBag
                  size={24}
                  className={isActive ? "text-secondary" : " text-textGry"}
                />
              </div>
              <p
                className={`text-sm  font-medium leading-tight ${isActive ? "text-secondary" : " text-textGry"}`}
              >
                Orders
              </p>
            </div>
          )}
        </NavLink>

        <NavLink to="/profile" className="w-full h-full">
          {({ isActive }) => (
            <div className="  w-full h-full flex items-center justify-center flex-col">
              <div>
                <FaRegUser
                  size={20}
                  className={isActive ? "text-secondary" : " text-textGry"}
                />
              </div>
              <p
                className={`text-sm mt-1 font-medium leading-tight ${isActive ? "text-secondary" : " text-textGry"}`}
              >
                Profile
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default BottomNavigation;
