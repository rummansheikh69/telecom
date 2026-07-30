import React, { useState, useMemo } from "react";
import { Search, Plus, Edit, Trash2, Phone, MapPin, User } from "lucide-react";
import { globalModal } from "../../../components/modals/modalManager";
import EditScammerModal from "../../../components/modals/EditScammerModal";
import DeleteScammerModal from "../../../components/modals/DeleteScammerModal";
import AdminLayout from "../../../components/layout/AdminLayout";

const INITIAL_SCAMMERS = [
  {
    id: "scm-1",
    phone: "+8801883372867",
    name: "John Doe",
    location: "Road 32, Dhaka",
    details:
      "জীবের মধ্যে সবচেয়ে সম্পূর্ণতা মানুষের। কিন্তু সবচেয়ে অসম্পূর্ণ হয়ে সে জন্মগ্রহণ করে। বাঘ ভালুক তার জীবনযাত্রার পনেরো- আনা মূলধন নিয়ে আসে প্রকৃতির মালখানা থেকে।",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIUDA_pct4Rlq8LANnoLjtPhBK666h3Zopw&s",
    reportedAt: "4 days ago",
  },
  {
    id: "scm-2",
    phone: "+8801711223344",
    name: "Rahim Uddin",
    location: "GEC Circle, Chittagong",
    details: "Fake payment screenshot sent for bulk agent cashout transaction.",
    photo: "https://placehold.co/200x200/073E7D/white?text=Evidence",
    reportedAt: "1 week ago",
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
  },
];

const ITEMS_PER_PAGE = 2;
const MAX_DETAILS_LENGTH = 45; // Max characters before truncating inside card

export default function ScammersAdminPage({ userRole = "ceo" }) {
  const [scammers, setScammers] = useState(INITIAL_SCAMMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [expandedCards, setExpandedCards] = useState({});

  // Toggle expandable description per card
  const toggleCardExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Search Filter
  const filteredScammers = useMemo(() => {
    if (!searchQuery.trim()) return scammers;
    const query = searchQuery.toLowerCase();
    return scammers.filter(
      (item) =>
        item.phone.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query),
    );
  }, [scammers, searchQuery]);

  // Paginated List
  const visibleScammers = useMemo(() => {
    return filteredScammers.slice(0, visibleCount);
  }, [filteredScammers, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleSaveScammer = async ({ formDataPayload, uiPreviewData }) => {
    setScammers((prev) => {
      const index = prev.findIndex((i) => i.id === uiPreviewData.id);
      if (index > -1) {
        const next = [...prev];
        next[index] = uiPreviewData;
        return next;
      }
      return [uiPreviewData, ...prev];
    });
  };

  const handleDeleteScammer = async (id) => {
    setScammers((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AdminLayout userRole={userRole}>
      <div className="space-y-4 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-slate-800">
              Scammer Directory Manager
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage scammer reports, blacklist phone numbers, and evidence.
            </p>
          </div>
          <button
            onClick={() => globalModal.open("edit_scammer_modal", null)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#073E7D] text-white rounded-xl text-xs font-bold shadow hover:bg-blue-900 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by phone, name, or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#073E7D] shadow-sm"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {visibleScammers.length > 0 ? (
            visibleScammers.map((item) => {
              const isExpanded = !!expandedCards[item.id];
              const shouldTruncate = item.details.length > MAX_DETAILS_LENGTH;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm flex items-start justify-between gap-3 relative"
                >
                  <div className="flex gap-3 min-w-0 flex-1">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-[#073E7D]" />
                        <span>{item.phone}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.name || "Unknown Name"}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location || "N/A"}</span>
                      </div>

                      {/* Expandable Details Quote */}
                      <div className="bg-slate-50 p-2 rounded-lg border-l-2 border-slate-300 mt-1">
                        <p className="text-[11px] text-slate-600 italic">
                          <q>
                            {isExpanded || !shouldTruncate
                              ? item.details
                              : `${item.details.slice(0, MAX_DETAILS_LENGTH)}... `}
                          </q>
                          {shouldTruncate && (
                            <button
                              type="button"
                              onClick={() => toggleCardExpand(item.id)}
                              className="ml-1 text-[#073E7D] font-bold not-italic hover:underline"
                            >
                              {isExpanded ? "See Less" : "See More"}
                            </button>
                          )}
                        </p>
                      </div>

                      <div className="text-[10px] text-slate-400 font-medium pt-1">
                        Reported - {item.reportedAt}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 pl-1">
                    <button
                      onClick={() =>
                        globalModal.open("edit_scammer_modal", item)
                      }
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        globalModal.open("delete_scammer_modal", item)
                      }
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-1">
              <p className="text-xs font-bold text-slate-600">
                No scammer reports found
              </p>
            </div>
          )}
        </div>

        {/* List Pagination "See More" Button */}
        {visibleCount < filteredScammers.length && (
          <div className="mt-6 flex justify-center pt-2">
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-5 py-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm active:scale-95 transition"
            >
              See More
            </button>
          </div>
        )}

        {/* Modals */}
        <EditScammerModal onSaveSuccess={handleSaveScammer} />
        <DeleteScammerModal onDeleteSuccess={handleDeleteScammer} />
      </div>
    </AdminLayout>
  );
}
