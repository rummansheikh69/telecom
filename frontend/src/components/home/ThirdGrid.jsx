import { MdVerifiedUser } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { TbMailFilled } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { TbClipboardListFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

function ThirdGrid() {
  return (
    <div className="mt-6 grid grid-cols-5 gap-2">
      {/* summery */}
      <Link to="/summery">
        <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
          <div className="  flex items-center justify-center">
            <TbClipboardListFilled size={34} className=" text-secondary" />
          </div>
          <p className="text-sm text-primary font-medium">Summery</p>
        </div>
      </Link>

      {/* orders */}
      <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-8 flex items-center justify-center">
          <FaCartShopping size={32} className=" text-secondary" />
        </div>
        <p className="text-sm text-primary font-medium">Orders</p>
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
          <IoChatbubbleEllipsesSharp size={32} className=" text-secondary" />
        </div>
        <p className="text-sm text-primary font-medium">Chat</p>
      </div>

      {/* inbox */}
      <Link to="/inbox">
        <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
          <div className=" size-8 flex items-center justify-center">
            <TbMailFilled size={32} className=" text-secondary" />
          </div>
          <p className="text-sm text-primary font-medium">Inbox</p>
        </div>
      </Link>

      {/* admission */}
      <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-8 flex items-center justify-center">
          <FiPlus size={32} className=" text-secondary" />
        </div>
        <p className="text-sm text-primary font-medium">Admit</p>
      </div>

      {/* Verify */}
      <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-8 flex items-center justify-center">
          <MdVerifiedUser size={32} className=" text-secondary" />
        </div>
        <p className="text-sm text-primary font-medium">Verify</p>
      </div>

      {/* helpline */}
      <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
        <div className=" size-8 flex items-center justify-center">
          <PiPhoneCallFill size={32} className=" text-secondary" />
        </div>
        <p className="text-sm text-primary font-medium">Helpline</p>
      </div>

      {/* rules */}
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

      {/* reviews */}
      <Link to="/reviews">
        <div className="bg-subMain rounded-2xl p-2 pt-3 shadow-lg flex items-center justify-center flex-col gap-1.5">
          <div className=" size-8 flex items-center justify-center">
            <GoStarFill size={32} className=" text-secondary" />
          </div>
          <p className="text-sm text-primary font-medium">Reviews</p>
        </div>
      </Link>
    </div>
  );
}

export default ThirdGrid;
