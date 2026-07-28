import React, { useState } from "react";
import {
  Download,
  Search,
  CheckCircle2,
  Star,
  ShieldCheck,
} from "lucide-react";
import PageTitle from "../components/layout/PageTitle";

// App Store Directory Dataset
const APPS_DATA = [
  {
    id: "app-1",
    name: "Star2Pay Merchant",
    brief:
      "Accept instant P2P payments, view real-time settlement reports, and manage cash flow.",
    icon: "https://placehold.co/100x100/073E7D/white?text=S2P",
    rating: "4.9",
    size: "14 MB",
    downloadUrl: "#",
    isInstalled: false,
  },
  {
    id: "app-2",
    name: "Telecom Reseller Pro",
    brief:
      "Bulk mobile topups, drive pack management, and automated operator routing.",
    icon: "https://placehold.co/100x100/0284C7/white?text=TRP",
    rating: "4.8",
    size: "18 MB",
    downloadUrl: "#",
    isInstalled: true,
  },
  {
    id: "app-3",
    name: "Kothasongkolon POS",
    brief:
      "Lightweight point-of-sale app for billing, inventory tracking, and printing receipts.",
    icon: "https://placehold.co/100x100/16A34A/white?text=POS",
    rating: "4.7",
    size: "22 MB",
    downloadUrl: "#",
    isInstalled: false,
  },
  {
    id: "app-4",
    name: "MFS Gateway Agent",
    brief:
      "Unified cash-in and cash-out terminal supporting bKash, Nagad, and Rocket.",
    icon: "https://placehold.co/100x100/EA580C/white?text=MFS",
    rating: "4.9",
    size: "12 MB",
    downloadUrl: "#",
    isInstalled: false,
  },
  {
    id: "app-5",
    name: "Business Ledger (Hishab)",
    brief:
      "Digital duebook (Bakir Khata) to keep track of customer credit and automatic SMS reminders.",
    icon: "https://placehold.co/100x100/9333EA/white?text=HIS",
    rating: "4.6",
    size: "9 MB",
    downloadUrl: "#",
    isInstalled: false,
  },
];

export default function AppStorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const [installedApps, setInstalledApps] = useState(
    APPS_DATA.filter((a) => a.isInstalled).map((a) => a.id),
  );

  // Filter apps based on search input
  const filteredApps = APPS_DATA.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.brief.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Simulate app download/install action
  const handleDownload = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setInstalledApps((prev) => [...prev, id]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-main font-sans pb-12">
      {/* Top Bar Navigation */}
      <PageTitle link="/" title="App Store" />

      {/* Main Container */}
      <div className="max-w-md mx-auto px-4 pt-3 space-y-4">
        {/* SEARCH BAR */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search business tools & apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#073E7D] shadow-sm"
          />
        </div>

        {/* PROMO / TRUST BADGE */}
        <div className="bg-[#073E7D]/5 border border-[#073E7D]/15 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#073E7D] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-extrabold text-[#073E7D]">
              Verified Business Tools
            </h2>
            <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
              Securely integrated applications built for Star2Pay merchant
              operations.
            </p>
          </div>
        </div>

        {/* SECTION HEADER */}
        <div className="flex justify-between items-center px-1 pt-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Available Apps ({filteredApps.length})
          </h3>
        </div>

        {/* COLUMN LAYOUT FOR APP CARDS */}
        <div className="space-y-3">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => {
              const isInstalled = installedApps.includes(app.id);
              const isDownloading = downloadingId === app.id;

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex items-center justify-between gap-3 hover:border-blue-100 transition"
                >
                  {/* LEFT & CENTER ROW: LOGO + NAME & BRIEF */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* App Logo */}
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name, Meta & Brief Description */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-slate-800 truncate leading-tight">
                        {app.name}
                      </h4>

                      {/* Rating & Size details */}
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] font-semibold text-slate-400">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {app.rating}
                        </span>
                        <span>•</span>
                        <span>{app.size}</span>
                      </div>

                      {/* Brief description */}
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-snug mt-1">
                        {app.brief}
                      </p>
                    </div>
                  </div>

                  {/* VERTICAL DIVIDER */}
                  <div className="h-10 w-[1px] bg-slate-200/80 shrink-0 mx-1" />

                  {/* RIGHT ACTION: DOWNLOAD / INSTALLED ICON */}
                  <div className="shrink-0 flex items-center justify-center pl-1">
                    {isInstalled ? (
                      <div
                        title="Installed"
                        className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={isDownloading}
                        onClick={() => handleDownload(app.id)}
                        title="Download App"
                        className="p-2.5 rounded-xl bg-blue-50 text-[#073E7D] hover:bg-[#073E7D] hover:text-white transition duration-200 flex items-center justify-center disabled:opacity-50"
                      >
                        {isDownloading ? (
                          <div className="w-5 h-5 border-2 border-[#3e98ff] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty Search Result Fallback */
            <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center space-y-2">
              <p className="text-2xl">📱</p>
              <p className="text-sm font-bold text-slate-700">
                No applications found
              </p>
              <p className="text-xs text-slate-400">
                Try searching for a different keyword or app name.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
