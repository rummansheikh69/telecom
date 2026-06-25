import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  User,
  Hash,
  DollarSign,
  FileText,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import PageTitle from "../components/layout/PageTitle";

export default function OrderDetailsPage() {
  // Order Lifecycle State: "RECEIVED" (15m timer), "ACCEPTED" (2h timer), "CANCELLED"
  const [orderStatus, setOrderStatus] = useState("RECEIVED");
  const [timeLeft, setTimeLeft] = useState("");

  // Static Mock Order Meta Context
  const orderData = {
    id: "ORD-99201X",
    buyerName: "Asif Rahman",
    buyerUid: "U1013",
    buyerImage:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    price: "499.00",
    title: "Robi 40 GB + 800 Minutes",
    targetNumber: "01812345678",
    description:
      "Purchased Robi 40 GB + 800 Minutes pack. Send configuration payload instantly via cellular channel.",
    receivedAt: Date.now(), // Reference point for client-side ticking simulation
  };

  // Live Dhaka-aligned Countdown Ticking Engine
  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setTimeLeft("");
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - orderData.receivedAt;

      if (orderStatus === "RECEIVED") {
        // 15 Minute Window countdown
        const fifteenMinutes = 15 * 60 * 1000;
        const remaining = fifteenMinutes - elapsed;

        if (remaining <= 0) {
          setOrderStatus("CANCELLED");
          clearInterval(interval);
        } else {
          const mins = Math.floor(remaining / 60 / 1000);
          const secs = Math.floor((remaining % (60 * 1000)) / 1000);
          setTimeLeft(`${mins}m ${secs}s remaining to accept`);
        }
      } else if (orderStatus === "ACCEPTED") {
        // 2 Hour Window countdown
        const twoHours = 2 * 60 * 60 * 1000;
        const remaining = twoHours - elapsed;

        if (remaining <= 0) {
          setTimeLeft("Time Out");
          clearInterval(interval);
        } else {
          const hours = Math.floor(remaining / (60 * 60 * 1000));
          const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
          const secs = Math.floor((remaining % (60 * 1000)) / 1000);
          setTimeLeft(`${hours}h ${mins}m ${secs}s left to complete`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [orderStatus]);

  const handleAcceptOrder = () => {
    setOrderStatus("ACCEPTED");
  };

  const handleCancelOrder = () => {
    setOrderStatus("CANCELLED");
  };

  return (
    <div className="min-h-screen bg-main font-sans pb-10">
      {/* Top Header Shell */}
      <PageTitle link="/inbox" title="Order Management" />

      <div className="max-w-md mx-auto px-4 mt-4 space-y-4">
        {/* TIMER BANNER (Changes color and state context dynamically) */}
        {orderStatus !== "CANCELLED" ? (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 shadow-sm transition-colors duration-300 ${
              orderStatus === "RECEIVED"
                ? "bg-amber-50 border-amber-200 text-amber-800"
                : "bg-blue-50 border-blue-200 text-[#073E7D]"
            }`}
          >
            <Clock
              className={`w-5 h-5 shrink-0 animate-spin`}
              style={{ animationDuration: "6s" }}
            />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                {orderStatus === "RECEIVED"
                  ? "Action Required (15m Limit)"
                  : "Fulfillment Window (2h Limit)"}
              </p>
              <p className="text-sm font-black mt-0.5 tracking-tight">
                {timeLeft || "Calculating time..."}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3 shadow-sm">
            <XCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                Order Terminated
              </p>
              <p className="text-xs mt-0.5 font-medium opacity-90">
                This order loop has been completely cancelled and revoked.
              </p>
            </div>
          </div>
        )}

        {/* BUYER PROFILE CARD CONTAINER */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
            {orderData.buyerImage ? (
              <img
                src={orderData.buyerImage}
                alt="buyer"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#073E7D] rounded">
                Buyer
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                UID: {orderData.buyerUid}
              </span>
            </div>
            <h2 className="text-base font-black text-slate-800 mt-1">
              {orderData.buyerName}
            </h2>
          </div>
        </div>

        {/* ORDER CORE METRICS BLOCK */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] overflow-hidden divide-y divide-slate-100">
          {/* Order ID & Price Row */}
          <div className="p-4 flex justify-between items-center bg-slate-50/50">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Order Reference
              </p>
              <p className="text-sm font-bold text-slate-700 font-mono mt-0.5">
                {orderData.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Order P2P Value
              </p>
              <p className="text-lg font-black text-[#073E7D] mt-0.5">
                TK {orderData.price}
              </p>
            </div>
          </div>

          {/* Telecom Target Package Meta details */}
          <div className="p-4 space-y-3.5">
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Target Phone Number</span>
              </div>
              <p className="text-base font-extrabold text-slate-800 mt-1 tracking-wide">
                {orderData.targetNumber}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Order Pack Details</span>
              </div>
              <p className="text-sm font-bold text-slate-700 mt-1">
                {orderData.title}
              </p>
            </div>

            {orderData.description && (
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  User Statement / Notes
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium bg-slate-50 p-3 border border-slate-200/60 rounded-xl leading-relaxed">
                  {orderData.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CONDITIONAL ACTION SYSTEM FOOTER */}
        {orderStatus === "RECEIVED" && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancelOrder}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2 border border-slate-200/40"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel Order</span>
            </button>
            <button
              type="button"
              onClick={handleAcceptOrder}
              className="w-full bg-[#073E7D] hover:bg-blue-900 text-white font-bold py-4 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Accept Order</span>
            </button>
          </div>
        )}

        {orderStatus === "ACCEPTED" && (
          <div className="space-y-3 pt-2">
            <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="font-medium">
                Order accepted successfully! You have 2 hours to provision the
                telecommunication package balance now.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancelOrder}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold py-3.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency Cancellation Request</span>
            </button>
          </div>
        )}

        {orderStatus === "CANCELLED" && (
          <div className="pt-2 animate-fadeIn">
            <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-center text-xs font-bold text-slate-500">
              🚫 No actions available. This record loop is archive-only.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
