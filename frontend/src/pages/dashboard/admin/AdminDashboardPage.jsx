import React from "react";

import {
  Users,
  TrendingUp,
  AlertTriangle,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className=" space-y-4 mb-16">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-slate-800">
              Admin Control Panel
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Real-time status of Star2Pay pipeline.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
            SYSTEM ONLINE
          </span>
        </div>

        {/* METRICS STAT CARDS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Total Volume
              </span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-base font-black text-slate-800">TK 1,42,800</p>
            <span className="text-[10px] text-emerald-600 font-bold">
              +12.4% today
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Active Trades
              </span>
              <Users className="w-3.5 h-3.5 text-[#073E7D]" />
            </div>
            <p className="text-base font-black text-slate-800">48 Pipeline</p>
            <span className="text-[10px] text-slate-400 font-medium">
              12 pending match
            </span>
          </div>
        </div>

        {/* DISPUTE ALERT CARD */}
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900">
              3 Pending Dispute Tickets
            </h4>
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              P2P trade transfers require manual TrxID verification before
              completion timeout.
            </p>
          </div>
        </div>

        {/* QUICK MANAGEMENT SHORTCUTS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-left hover:border-blue-200 transition">
              <p className="text-xs font-bold text-slate-800">Verify Cashout</p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                5 pending withdrawals
              </p>
            </button>
            <button className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-left hover:border-blue-200 transition">
              <p className="text-xs font-bold text-slate-800">Topup Queue</p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                8 auto-recharges
              </p>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
