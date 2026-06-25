import React, { useState } from "react";
import PageTitle from "../components/layout/PageTitle";
import {
  ShoppingBag,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  XCircle,
  AlertCircle,
  MessageSquare,
  Star,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";

export default function SummaryPage() {
  // Local active filtering/timeframes selection tab
  const [timeframe, setTimeframe] = useState("24 Hour");

  // Mock summary analytics dataset tailored strictly to your instructions
  const summaryStats = [
    {
      id: "total_orders",
      label: "Total Orders",
      value: "148",
      hasAmount: true,
      amount: "45,230.00",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      id: "pending_orders",
      label: "Pending Orders",
      value: "12",
      hasAmount: true,
      amount: "3,840.00",
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      id: "buy",
      label: "Buy Volume",
      value: "84",
      hasAmount: true,
      amount: "28,450.00",
      icon: ArrowUpRight,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      id: "sell",
      label: "Sell Volume",
      value: "64",
      hasAmount: true,
      amount: "16,780.00",
      icon: ArrowDownLeft,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      id: "buy_cancel",
      label: "Buy Cancelled",
      value: "3",
      hasAmount: true,
      amount: "950.00",
      icon: XCircle,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      id: "sell_cancel",
      label: "Sell Cancelled",
      value: "5",
      hasAmount: true,
      amount: "1,420.00",
      icon: AlertCircle,
      color: "bg-orange-50 text-orange-600 border-orange-100",
    },
    {
      id: "review_sent",
      label: "Reviews Sent",
      value: "38",
      hasAmount: false, // No currency amount display required
      icon: MessageSquare,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      id: "received_review",
      label: "Received Reviews",
      value: "42",
      hasAmount: false, // No currency amount display required
      icon: Star,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
  ];

  const handleSeeMore = (statId, statLabel) => {
    console.log(
      `Navigating to detailed log logs for: ${statId} - ${statLabel}`,
    );
    // Router code fallback hook layout template context:
    // navigate(`/history?filter=${statId}`);
  };

  return (
    <div className="bg-main min-h-screen overflow-y-scroll flex flex-col justify-between font-sans pb-10">
      <div>
        {/* Top Header Navigation matching the application layout parameters */}
        <PageTitle link={"/"} title={"Account Summary"} />

        {/* Minimal Filters Row Container */}
        <div className="px-4 mt-5 flex justify-between items-center">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200/60 shadow-sm">
            {["24 Hour", "7 Days", "30 Days"].map((tab) => (
              <button
                key={tab}
                onClick={() => setTimeframe(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  timeframe === tab
                    ? "bg-secondary text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="p-2 bg-white rounded-xl border border-slate-200/60 text-slate-600 hover:bg-slate-50 transition shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Main Unique Grid Presentation System Layout */}
        <div className="mt-4 pb-10 px-4 space-y-3">
          {summaryStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-slate-200 transition duration-150"
              >
                {/* Left Block: Icon Graphic Badge and Context Text */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${stat.color}`}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </h4>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-lg font-bold text-slate-800">
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        items
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Block: Currency values output alongside the dynamic trigger shortcut button */}
                <div className="flex items-center gap-4">
                  {stat.hasAmount && (
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Volume
                      </p>
                      <p className="text-sm font-black text-secondary mt-0.5">
                        TK {stat.amount}
                      </p>
                    </div>
                  )}

                  {/* Minimal & Unique "See More" interactive button capsule layout */}
                  <button
                    type="button"
                    onClick={() => handleSeeMore(stat.id, stat.label)}
                    className="flex items-center gap-1 py-1.5 pl-3 pr-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-slate-500 hover:text-slate-800 font-semibold text-[11px] rounded-xl transition group"
                  >
                    <span>See more</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
