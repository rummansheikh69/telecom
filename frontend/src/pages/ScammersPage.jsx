import React, { useState, useMemo } from "react";
import PageTitle from "../components/layout/PageTitle";
import { FiPlus } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { IoDocumentText, IoLocationOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { globalModal } from "../components/modals/modalManager";
import EditScammerModal from "../components/modals/EditScammerModal";

const DUMMY_SCAMMERS = [
  {
    id: "scm-1",
    phone: "+8801883372867",
    name: "John Doe",
    location: "Road 32, Dhaka",
    details:
      "জীবের মধ্যে সবচেয়ে সম্পূর্ণতা মানুষের। কিন্তু সবচেয়ে অসম্পূর্ণ হয়ে সে জন্মগ্রহণ করে। বাঘ ভালুক তার জীবনযাত্রার পনেরো- আনা মূলধন নিয়ে আসে প্রকৃতির মালখানা থেকে। জীবরঙ্গভূমিতে মানুষ এসে দেখা দেয়",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIUDA_pct4Rlq8LANnoLjtPhBK666h3Zopw&s",
    reportedAt: "4 days ago",
    reporterName: "Admin Officer",
    reporterPhone: "8801883372867",
  },
  {
    id: "scm-2",
    phone: "+8801711998877",
    name: "Abdul Karim",
    location: "GEC Circle, Chittagong",
    details:
      "Sent fake SMS confirmation for cashout payment. Always verify agent balance before releasing cash.",
    photo: "https://placehold.co/200x200/073E7D/white?text=Scammer",
    reportedAt: "1 week ago",
    reporterName: "Branch Manager",
    reporterPhone: "8801700112233",
  },
  {
    id: "scm-3",
    phone: "+8801912345678",
    name: "Unknown Suspect",
    location: "Dhanmondi 27, Dhaka",
    details:
      "Attempted to bypass OTP during merchant login. Be careful while receiving calls claiming to be support.",
    photo: "https://placehold.co/200x200/e2e8f0/64748b?text=Evidence",
    reportedAt: "2 weeks ago",
    reporterName: "Security Team",
    reporterPhone: "8801900000000",
  },
];

const ITEMS_PER_PAGE = 2;

function ScammersPage() {
  const [scammersList, setScammersList] = useState(DUMMY_SCAMMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [expandedCards, setExpandedCards] = useState({});

  const MAX_CHARS = 35;

  // Search Filter
  const filteredScammers = useMemo(() => {
    if (!searchQuery.trim()) return scammersList;
    const query = searchQuery.toLowerCase();
    return scammersList.filter(
      (item) =>
        item.phone.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query),
    );
  }, [scammersList, searchQuery]);

  // Paginated List for "See More" button at bottom
  const visibleScammers = useMemo(() => {
    return filteredScammers.slice(0, visibleCount);
  }, [filteredScammers, visibleCount]);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleNewReportSaved = ({ uiPreviewData }) => {
    setScammersList((prev) => [uiPreviewData, ...prev]);
  };

  return (
    <div className="bg-main h-screen max-h-screen overflow-y-scroll">
      <PageTitle link="/" title="Scammer Community" />

      <div className="pb-16 mt-4 px-4 space-y-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Number, Name or Location"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on search
            }}
            className="w-full outline-none border-[1.5px] border-textGry/40 rounded-lg pl-10 pr-4 py-1.5 bg-transparent text-base text-textGry shadow-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textGry">
            <HiOutlineSearch className="size-5" />
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => globalModal.open("edit_scammer_modal", null)}
            className="flex items-center justify-center flex-col bg-secondary rounded-xl p-4 shadow-lg cursor-pointer active:scale-95 transition"
          >
            <div>
              <FiPlus className="size-7 text-main" />
            </div>
            <p className="text-main text-base font-medium">Add</p>
          </div>

          <div className="flex items-center justify-center flex-col bg-light rounded-xl p-4 cursor-pointer active:scale-95 transition">
            <div>
              <IoDocumentText className="size-7 text-secondary" />
            </div>
            <p className="text-secondary text-base font-medium">My List</p>
          </div>
        </div>

        {/* Recent Reports List */}
        <div className="mt-4">
          <h2 className="text-lg font-medium text-secondary mb-3">
            Recent Reports ({filteredScammers.length})
          </h2>

          <div className="space-y-4">
            {visibleScammers.length > 0 ? (
              visibleScammers.map((item) => {
                const isExpanded = !!expandedCards[item.id];
                const shouldTruncate = item.details.length > MAX_CHARS;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 pb-4 border-b border-textGry/20"
                  >
                    {/* Left Photo Column */}
                    <div className="col-span-4 h-52 max-h-52">
                      <div className="rounded-md w-full h-full bg-subMain overflow-hidden">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Right Info Column */}
                    <div className="col-span-8">
                      <div className="rounded-md w-full h-full bg-subMain p-3 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <MdLocalPhone className="text-secondary size-5 shrink-0" />
                            <p className="text-secondary font-semibold text-sm truncate">
                              {item.phone}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <LuUser className="text-textGry size-5 shrink-0" />
                            <p className="text-textGry text-sm truncate">
                              {item.name || "Unknown"}
                            </p>
                          </div>

                          <div
                            className={`flex gap-2 ${
                              item.location.length > 30
                                ? "items-start"
                                : "items-center"
                            }`}
                          >
                            <IoLocationOutline
                              className={`text-textGry size-5 shrink-0 ${
                                item.location.length > 30 ? "mt-1" : ""
                              }`}
                            />
                            <p className="text-textGry text-sm line-clamp-1">
                              {item.location}
                            </p>
                          </div>

                          {/* Scammer Details Quote */}
                          <div className="p-2 bg-main rounded-lg border-l-4 border-textGry mt-2">
                            <p className="text-sm italic text-textPrimary">
                              <q>
                                {isExpanded || !shouldTruncate
                                  ? item.details
                                  : `${item.details.slice(0, MAX_CHARS)}... `}
                              </q>

                              {shouldTruncate && (
                                <button
                                  type="button"
                                  onClick={() => toggleExpand(item.id)}
                                  className="ml-1 text-secondary font-medium not-italic underline"
                                >
                                  {isExpanded ? "See less" : "See more"}
                                </button>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Footer Meta */}
                        <div className="mt-3 pt-2 border-t border-textGry/10">
                          <h5 className="text-xs text-textGry whitespace-nowrap">
                            Reported - {item.reportedAt}
                          </h5>
                          <h5 className="text-xs text-textGry whitespace-nowrap truncate">
                            {item.reporterName} - {item.reporterPhone}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-subMain rounded-xl text-textGry text-sm">
                No scammer reports match your search.
              </div>
            )}
          </div>

          {/* See More Button at Bottom */}
          {visibleCount < filteredScammers.length && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="px-6 py-2.5 bg-secondary text-main text-sm font-semibold rounded-xl shadow-md active:scale-95 transition"
              >
                See More
              </button>
            </div>
          )}
        </div>

        {/* Modal for adding/editing scammers */}
        <EditScammerModal onSaveSuccess={handleNewReportSaved} />
      </div>
    </div>
  );
}

export default ScammersPage;
