import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  Download,
  ExternalLink,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";
import EditAppModal from "../../../components/modals/EditAppModal";
import DeleteAppModal from "../../../components/modals/DeleteAppModal";
import { globalModal } from "../../../components/modals/modalManager";

const INITIAL_APPS = [
  {
    id: "app-1",
    name: "Star2Pay Merchant",
    brief:
      "Accept instant P2P payments, view real-time settlement reports, and manage cash flow.",
    icon: "https://placehold.co/100x100/073E7D/white?text=S2P",
    rating: "4.9",
    size: "14 MB",
    downloadUrl: "https://example.com/downloads/star2pay-merchant.apk",
  },
  {
    id: "app-2",
    name: "Telecom Reseller Pro",
    brief:
      "Bulk mobile topups, drive pack management, and automated operator routing.",
    icon: "https://placehold.co/100x100/0284C7/white?text=TRP",
    rating: "4.8",
    size: "18 MB",
    downloadUrl: "https://example.com/downloads/telecom-reseller.apk",
  },
];

export default function AppStoreAdminPage({ userRole = "ceo" }) {
  const [apps, setApps] = useState(INITIAL_APPS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.brief.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [apps, searchQuery]);

  const handleSaveApp = async ({ formDataPayload, uiPreviewData }) => {
    /* 
      📡 BACKEND INTEGRATION:
      const response = await fetch('/api/apps', {
        method: formDataPayload.has("id") ? "PUT" : "POST",
        body: formDataPayload,
      });
    */

    setApps((prev) => {
      const index = prev.findIndex((i) => i.id === uiPreviewData.id);
      if (index > -1) {
        const next = [...prev];
        next[index] = uiPreviewData;
        return next;
      }
      return [uiPreviewData, ...prev];
    });
  };

  const handleDeleteApp = async (id) => {
    /* 
      📡 BACKEND INTEGRATION:
      await fetch(`/api/apps/${id}`, { method: "DELETE" });
    */

    setApps((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <AdminLayout userRole={userRole}>
      <div className="space-y-4 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-slate-800">
              App Store Directory Manager
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage merchant tools & direct download links.
            </p>
          </div>
          <button
            onClick={() => globalModal.open("edit_app_modal", null)}
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
            placeholder="Search apps by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#073E7D] shadow-sm"
          />
        </div>

        {/* Apps List */}
        <div className="space-y-3">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm flex items-center justify-between gap-3 relative group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {app.name}
                      </h4>
                      {app.downloadUrl && (
                        <a
                          href={app.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5 hover:underline"
                        >
                          Link <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-[10px] font-semibold text-slate-400">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {app.rating}
                      </span>
                      <span>•</span>
                      <span>{app.size}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 leading-snug mt-1">
                      {app.brief}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <button
                    onClick={() => globalModal.open("edit_app_modal", app)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => globalModal.open("delete_app_modal", app)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-1">
              <p className="text-xs font-bold text-slate-600">
                No applications found
              </p>
            </div>
          )}
        </div>

        {/* Modals */}
        <EditAppModal onSaveSuccess={handleSaveApp} />
        <DeleteAppModal onDeleteSuccess={handleDeleteApp} />
      </div>
    </AdminLayout>
  );
}
