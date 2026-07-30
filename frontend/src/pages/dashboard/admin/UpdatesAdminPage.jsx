import React, { useState, useMemo } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { globalModal } from "../../../components/modals/modalManager";
import EditUpdateModal from "../../../components/modals/EditUpdateModal";
import DeleteUpdateModal from "../../../components/modals/DeleteUpdateModal";
import AdminLayout from "../../../components/layout/AdminLayout";

const INITIAL_UPDATES = [
  {
    id: "1232",
    title: "Weekend cashback offer: Get 10% cashback",
    text: "Don't miss out on this limited-time offer to save more on your purchases!",
    timeAgo: "2h ago",
    image:
      "https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg",
  },
  {
    id: "1233",
    title: "System Maintenance Notice",
    text: "Our services will undergo scheduled maintenance tonight from 2 AM to 4 AM.",
    timeAgo: "5h ago",
    image:
      "https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg",
  },
];

export default function UpdatesAdminPage({ userRole = "ceo" }) {
  const [updates, setUpdates] = useState(INITIAL_UPDATES);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUpdates = useMemo(() => {
    if (!searchQuery.trim()) return updates;
    return updates.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [updates, searchQuery]);

  const handleSaveUpdate = (savedItem) => {
    setUpdates((prev) => {
      const index = prev.findIndex((i) => i.id === savedItem.id);
      if (index > -1) {
        const next = [...prev];
        next[index] = savedItem;
        return next;
      }
      return [savedItem, ...prev];
    });
  };

  const handleDeleteUpdate = (id) => {
    setUpdates((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AdminLayout userRole={userRole}>
      <div className="space-y-4 pb-12">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-slate-800">
              Today's Updates Manager
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Create and manage news / announcements feed.
            </p>
          </div>
          <button
            onClick={() => globalModal.open("edit_update_modal", null)}
            className="flex items-center gap-1.5 px-3 py-2 bg-secondary text-white rounded-xl text-xs font-bold shadow hover:bg-blue-900 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Update</span>
          </button>
        </div>

        {/* Search Field */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search updates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-secondary shadow-sm"
          />
        </div>

        {/* News Feed List */}
        <div className="space-y-3">
          {filteredUpdates.length > 0 ? (
            filteredUpdates.map((item) => {
              const truncatedText =
                item.text.length > 50
                  ? `${item.text.substring(0, 50)}...`
                  : item.text;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-sm relative group"
                >
                  {/* Quick Action Overlay Buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      onClick={() =>
                        globalModal.open("edit_update_modal", item)
                      }
                      className="p-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-200 text-slate-700 transition"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        globalModal.open("delete_update_modal", item)
                      }
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* News Card structure matching user app */}
                  <div className="grid grid-cols-12 gap-3 pr-16">
                    <div className="col-span-8">
                      <div className="flex items-center gap-1">
                        <GoDotFill className="size-3 text-slate-400" />
                        <h2 className="text-xs text-slate-500 font-medium">
                          {item.timeAgo}
                        </h2>
                      </div>

                      <div className="mt-1">
                        <h1 className="text-sm font-bold text-secondary leading-snug">
                          {item.title}
                        </h1>
                      </div>

                      <div className="mt-1">
                        <p
                          className="text-xs text-slate-600 leading-relaxed"
                          title={item.text}
                        >
                          {truncatedText}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-4">
                      <div className="bg-slate-100 rounded-lg h-20 w-full overflow-hidden border border-slate-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                            No Image
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-1">
              <p className="text-xs font-bold text-slate-600">
                No updates found
              </p>
              <p className="text-[11px] text-slate-400">
                Click "New Update" to create one.
              </p>
            </div>
          )}
        </div>

        {/* Global Modals */}
        <EditUpdateModal onSaveSuccess={handleSaveUpdate} />
        <DeleteUpdateModal onDeleteSuccess={handleDeleteUpdate} />
      </div>
    </AdminLayout>
  );
}
