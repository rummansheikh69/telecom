import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Smartphone,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  MessageSquare,
  PhoneCall,
} from "lucide-react";

// --- MOCK RELEVENT DATA FOR ONGOING/PENDING ORDERS ---
const INITIAL_ORDERS = [
  {
    id: "ORD-8821X",
    type: "BUY",
    offerType: "Telecom Pack",
    title: "Robi 40 GB + 800 Minutes",
    validity: "30 Days",
    price: 499.0,
    targetNumber: "01812345678",
    statementProvided:
      "Bkash Cash Out to 01711223344. Last 3 digits: 582, TrxID: MX82K911",
    status: "AWAITING_ACCEPTANCE", // 15-min phase
    createdAt: Date.now() - 4 * 60 * 1000, // 4 mins ago
    sellerName: "Siam Telecom",
  },
  {
    id: "ORD-7540Y",
    type: "BUY",
    offerType: "Telecom Pack",
    title: "Banglalink 25 GB Unlimited",
    validity: "7 Days",
    price: 298.0,
    targetNumber: "01987654321",
    statementProvided: "Nagad Send Money from 01911******. TrxID: NG991202X",
    status: "IN_PROGRESS", // 2-hour phase
    createdAt: Date.now() - 25 * 60 * 1000, // 25 mins ago
    sellerName: "Alif Digital Point",
  },
];

const currentUserId = "U1013";

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Helper function to calculate real-time countdown clocks
  const getRemainingTime = (order) => {
    const now = Date.now();
    const elapsed = now - order.createdAt;

    if (order.status === "AWAITING_ACCEPTANCE") {
      const fifteenMins = 15 * 60 * 1000;
      const remaining = fifteenMins - elapsed;
      if (remaining <= 0) return "Expired (Auto-Cancelling)";

      const mins = Math.floor(remaining / 60 / 1000);
      const secs = Math.floor((remaining % (60 * 1000)) / 1000);
      return `${mins}m ${secs}s left to accept`;
    } else {
      // IN_PROGRESS: 2 Hours Timer
      const twoHours = 2 * 60 * 60 * 1000;
      const remaining = twoHours - elapsed;
      if (remaining <= 0) return "Time Out";

      const hours = Math.floor(remaining / (60 * 60 * 1000));
      const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
      return `${hours}h ${mins}m left to complete`;
    }
  };

  // Force re-render every second to update countdown states smoothly
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
      {/* Mobile Frame Shell */}
      <div className="w-full max-w-md h-[844px] bg-[#f4f6f9] shadow-2xl rounded-[32px] overflow-hidden flex flex-col relative border border-gray-200">
        {/* TOP APP BAR */}
        <div className="bg-[#073E7D] text-white px-4 pt-6 pb-4 flex items-center gap-3">
          <button className="hover:bg-blue-900 p-1 rounded-full transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold tracking-wide">
              Ongoing Orders
            </h1>
            <p className="text-[11px] text-blue-200 font-medium">
              Active P2P Trades & Telecom Packs
            </p>
          </div>
          <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
            {orders.length} Active
          </span>
        </div>

        {/* MAIN BODY SCROLL */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            const isAwaiting = order.status === "AWAITING_ACCEPTANCE";

            return (
              <div
                key={order.id}
                className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden shadow-sm ${
                  isAwaiting
                    ? "border-amber-200 ring-2 ring-amber-500/5"
                    : "border-emerald-200 ring-2 ring-emerald-500/5"
                }`}
              >
                {/* HEAD SUMMARY TIER */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {order.id}
                      </span>
                      <h3 className="text-base font-black text-slate-800 mt-1.5">
                        {order.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-1 rounded-md tracking-wide uppercase ${
                          isAwaiting
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {isAwaiting ? "Awaiting Acceptance" : "Processing Pack"}
                      </span>
                      <p className="text-base font-black text-[#073E7D] mt-1">
                        TK {order.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* DYNAMIC P2P LIVE COUNTDOWN TIMER BLOCK */}
                  <div
                    className={`mt-3 p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold ${
                      isAwaiting
                        ? "bg-amber-50 text-amber-800"
                        : "bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    <Clock
                      className={`w-4 h-4 animate-spin ${isAwaiting ? "text-amber-600" : "text-emerald-600"}`}
                      style={{ animationDuration: "4s" }}
                    />
                    <span className="flex-1 tracking-tight">
                      {getRemainingTime(order)}
                    </span>
                    <span className="text-[10px] opacity-60">
                      {isAwaiting ? "15m limit" : "2h limit"}
                    </span>
                  </div>
                </div>

                {/* TARGET TELECOM UTILITY & NUMBER SPECIFICATION */}
                <div className="px-4 py-3 bg-slate-50 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-slate-400 font-medium">
                        Target Mobile Number
                      </p>
                      <p className="text-sm font-bold text-slate-800 tracking-wide">
                        {order.targetNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 font-medium">Validity</p>
                    <p className="font-bold text-slate-700">{order.validity}</p>
                  </div>
                </div>

                {/* ACCORDION TRIGGER FOR PAYMENT STATEMENTS */}
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="w-full px-4 py-2 bg-white flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 transition border-t border-gray-50"
                >
                  <span>
                    {isExpanded
                      ? "Hide Trade Details"
                      : "View P2P Statement & Merchant Details"}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* EXPANDABLE DRAWER SECTION */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50/50 border-t border-gray-100 space-y-3.5 text-xs animate-fadeIn">
                    {/* User Provided Receipt Data / Statement */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-inner">
                      <p className="font-bold text-slate-400 uppercase tracking-wide text-[10px] mb-1">
                        Your Provided Payment Statement
                      </p>
                      <p className="text-slate-700 leading-relaxed font-medium bg-slate-50 p-2 rounded-lg border border-dashed border-slate-200">
                        {order.statementProvided}
                      </p>
                    </div>

                    {/* Merchant / Seller Info details block */}
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200/60">
                      <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">
                          Assigned Dealer / Seller
                        </p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5">
                          {order.sellerName}
                        </p>
                      </div>

                      {/* P2P Support Call/Chat Shortcuts */}
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition">
                          <PhoneCall className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Guard Disclaimer notice rule */}
                    <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100/50">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <p>
                        Do not cancel if payment has already been sent. Asset
                        protection escrow is active during trade execution.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <AlertTriangle className="w-12 h-12 mx-auto stroke-[1.2] mb-2 text-slate-300" />
              <p className="text-sm font-medium">
                No ongoing orders right now.
              </p>
            </div>
          )}
        </div>

        {/* BOTTOM FIXED PERSISTENT BANNER FOR COMPLIANCE */}
        <div className="bg-white p-3 border-t border-gray-100 flex items-center justify-between text-xs px-4">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            <span>Escrow Server Synced</span>
          </div>
          <span className="text-slate-400 text-[11px]">
            User ID: {currentUserId}
          </span>
        </div>
      </div>
    </div>
  );
}
