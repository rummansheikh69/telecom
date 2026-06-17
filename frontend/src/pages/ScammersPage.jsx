import PageTitle from "../components/layout/PageTitle";
import { FiPlus } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

function ScammersPage() {
  const location = "Road 32, Dhaka";

  const [expanded, setExpanded] = useState(false);

  // Dummy data
  const scammerDetails =
    "জীবের মধ্যে সবচেয়ে সম্পূর্ণতা মানুষের। কিন্তু সবচেয়ে অসম্পূর্ণ হয়ে সে জন্মগ্রহণ করে। বাঘ ভালুক তার জীবনযাত্রার পনেরো- আনা মূলধন নিয়ে আসে প্রকৃতির মালখানা থেকে। জীবরঙ্গভূমিতে মানুষ এসে দেখা দেয়";

  const MAX_CHARS = 35;
  const shouldTruncate = scammerDetails.length > MAX_CHARS;

  return (
    <div className=" bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle link={"/"} title={"Scammer Community"} />

      <div className=" mt-4 px-4">
        <div className=" relative w-full">
          <input
            type="text"
            placeholder="Search Number"
            className=" w-full outline-none border-[1.5px] border-textGry/40 rounded-lg pl-10 pr-4 py-1.5 bg-transparent text-base text-textGry shadow-sm"
          />
          <div className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-textGry">
            <HiOutlineSearch />
          </div>
        </div>

        <div className=" grid grid-cols-2 mt-4 gap-4">
          <div className=" flex items-center justify-center flex-col bg-secondary rounded-xl p-4 shadow-lg">
            <div>
              <FiPlus className=" size-7 text-main" />
            </div>
            <p className=" text-main text-base font-medium">Add</p>
          </div>
          <div className=" flex items-center justify-center flex-col bg-light rounded-xl p-4 ">
            <div>
              <IoDocumentText className=" size-7 text-secondary" />
            </div>
            <p className=" text-secondary text-base font-medium">My List</p>
          </div>
        </div>

        <div className=" mt-4">
          <h2 className=" text-lg font-medium text-secondary">
            Recent Reports
          </h2>

          <div className=" mt-4 grid grid-cols-12 gap-2 pb-4 border-b border-textGry/20">
            <div className=" col-span-4 h-52 max-h-52  ">
              <div className=" rounded-md w-full h-full bg-subMain overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIUDA_pct4Rlq8LANnoLjtPhBK666h3Zopw&s"
                  alt=""
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>
            <div className=" col-span-8">
              <div className=" rounded-md w-full h-full bg-subMain p-3">
                <div className=" flex items-center gap-2">
                  <div>
                    <MdLocalPhone className=" text-secondary size-5" />
                  </div>
                  <p className=" text-secondary">+8801883372867</p>
                </div>

                <div className=" flex items-center gap-2 ">
                  <div>
                    <LuUser className=" text-textGry size-5" />
                  </div>
                  <p className=" text-textGry ">John Doe</p>
                </div>

                <div
                  className={`${location.length > 30 ? "items-start" : "items-center"} flex  gap-2 `}
                >
                  <div>
                    <IoLocationOutline
                      className={`${location.length > 30 ? "mt-1" : ""} text-textGry size-5`}
                    />
                  </div>
                  <p className=" text-textGry ">{location}</p>
                </div>

                {/* Detail of Scammer */}
                <div className="p-2 bg-main rounded-lg border-l-4 border-textGry mt-2">
                  <p className="text-sm italic text-textPrimary ">
                    <q>
                      {expanded || !shouldTruncate
                        ? scammerDetails
                        : `${scammerDetails.slice(0, MAX_CHARS)}... `}
                    </q>

                    {shouldTruncate && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="ml-1 text-secondary font-medium not-italic"
                      >
                        {expanded ? "See less" : "See more"}
                      </button>
                    )}
                  </p>
                </div>

                <div className=" mt-2">
                  <div>
                    <h5 className=" text-xs text-textGry whitespace-nowrap">
                      Reported - 4 days ago
                    </h5>
                    <h5 className=" text-xs text-textGry whitespace-nowrap ">
                      Admin Officer - 8801883372867
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScammersPage;
