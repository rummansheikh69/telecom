import { FiUser } from "react-icons/fi";
import ProfileCard from "../components/home/ProfileCard";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GoShieldLock } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

function ProfilePage() {
  return (
    <div className=" pt-4 bg-main min-h-screen px-4 pb-12">
      <ProfileCard />

      <div className=" my-7">
        <h4 className=" text-xs text-zinc-600 font-medium tracking-wide uppercase">
          Account Settings
        </h4>

        <div className=" mt-4 rounded-xl bg-subMain border border-textGry/30">
          {/* personal information  */}
          <Link to="/personal-info">
            <div className=" p-3 border-b border-textGry/20 flex items-center justify-between">
              <div className=" flex items-center gap-2.5">
                <div className=" size-10 rounded-lg flex items-center justify-center bg-secondary/10">
                  <FiUser className=" text-secondary" size={20} />
                </div>
                <h2 className=" text-base font-medium text-textPrimary/70">
                  Personal Information
                </h2>
              </div>

              <div>
                <IoIosArrowForward size={20} className=" text-textPrimary/70" />
              </div>
            </div>
          </Link>

          {/* my orders  */}
          <Link to="/orders">
            <div className=" p-3 border-b border-textGry/20 flex items-center justify-between">
              <div className=" flex items-center gap-2.5">
                <div className=" size-10 rounded-lg flex items-center justify-center bg-red-500/10">
                  <MdOutlineShoppingBag className=" text-red-500" size={20} />
                </div>
                <h2 className=" text-base font-medium text-textPrimary/70">
                  My Orders
                </h2>
              </div>

              <div>
                <IoIosArrowForward size={20} className=" text-textPrimary/70" />
              </div>
            </div>
          </Link>

          {/* address  */}
          <Link to="/address">
            <div className=" p-3  flex items-center justify-between">
              <div className=" flex items-center gap-2.5">
                <div className=" size-10 rounded-lg flex items-center justify-center bg-green-500/20">
                  <HiOutlineLocationMarker
                    className=" text-green-600"
                    size={20}
                  />
                </div>
                <h2 className=" text-base font-medium text-textPrimary/70">
                  Address
                </h2>
              </div>

              <div>
                <IoIosArrowForward size={20} className=" text-textPrimary/70" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className=" my-7">
        <h4 className=" text-xs text-zinc-600 font-medium tracking-wide uppercase">
          Preferences & Support
        </h4>

        <div className=" mt-4 rounded-xl bg-subMain border border-textGry/30">
          {/* Security */}
          <div className=" p-3  flex items-center justify-between">
            <div className=" flex items-center gap-2.5">
              <div className=" size-10 rounded-lg flex items-center justify-center bg-secondary/10">
                <GoShieldLock className=" text-secondary" size={20} />
              </div>
              <h2 className=" text-base font-medium text-textPrimary/70">
                Security
              </h2>
            </div>

            <div>
              <IoIosArrowForward size={20} className=" text-textPrimary/70" />
            </div>
          </div>
        </div>

        {/* support  */}
        <div className=" p-5 bg-secondary rounded-xl text-white/80 mt-4 relative overflow-hidden">
          <div className=" absolute -top-10 -right-4">
            <BiSupport className="size-40 opacity-20" />
          </div>
          <h2 className=" text-lg font-medium">Need help?</h2>
          <h4 className=" text-sm tracking-wide font-light">
            Our support team is available 24/7
          </h4>
          <Link to="/support">
            <div className=" px-4 py-1 text-sm bg-[#3569ac] rounded-lg mt-3 w-max">
              Contact Support
            </div>
          </Link>
        </div>
        {/* support end */}

        {/* logout  */}
        <div className=" w-full text-center py-2 bg-darkLight border border-zinc-300 rounded-xl flex items-center justify-center mt-4 gap-2">
          <div>
            <LuLogOut />
          </div>
          <span>Logout</span>
        </div>
        {/* logout end */}
      </div>
    </div>
  );
}

export default ProfilePage;
