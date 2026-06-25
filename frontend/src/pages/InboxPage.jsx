import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingBag,
  CheckCircle,
  Clock,
} from "lucide-react";
import PageTitle from "../components/layout/PageTitle";

// Mock Notification Data containing multiple action types (Orders vs. Wallet)
const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "orders",
    timestamp: "2026-06-26T00:12:00Z", // Will format to Dhaka Time
    isRead: false,
    buyerName: "Rony Khan",
    orderDescription:
      "Purchased Robi 40 GB + 800 Minutes pack. Awaiting your release confirmation.",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "notif-2",
    type: "wallet",
    action: "RECEIVED_MONEY",
    timestamp: "2026-06-25T22:30:00Z",
    isRead: false,
    amount: "1500.00",
    senderId: "U1013",
    trxId: "TXN8839102K",
  },
  {
    id: "notif-3",
    type: "orders",
    timestamp: "2026-06-25T18:15:00Z",
    isRead: true,
    buyerName: "Hamim Rahman",
    orderDescription: "", // Testing optional description fallback
    imagePlaceholder: null,
  },
  {
    id: "notif-4",
    type: "wallet",
    action: "WITHDRAW_MONEY",
    timestamp: "2026-06-25T11:05:00Z",
    isRead: true,
    amount: "5000.00",
    senderId: "SYSTEM",
    trxId: "WTH992102LL",
  },
];

export default function InboxPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Mark all as read helper
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  // Mark single notification as read on click
  const toggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  // Helper function to format ISO timestamps directly to Asia/Dhaka string format
  const formatDhakaTime = (isoString) => {
    const options = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(isoString).toLocaleString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-main">
      {/* Mobile Shell Frame */}
      <div className="w-full min-h-screen pb-16 bg-white shadow-2xl  overflow-hidden flex flex-col relative ">
        {/* TOP APP BAR */}
        <PageTitle link="/" title="Inbox" />

        {/* FEED CONTAINER (Flat non-card design) */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200/80">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => toggleRead(notif.id)}
              className={`p-4 transition cursor-pointer relative ${
                notif.isRead
                  ? "bg-white hover:bg-slate-50"
                  : "bg-blue-50/40 hover:bg-blue-50/70"
              }`}
            >
              {/* TOP ROW: DATE & TIME (DHAKA TIME ZONE) */}
              <div className=" absolute top-4 right-4 text-right text-[10px] font-semibold text-slate-400 tracking-wide mb-2">
                {formatDhakaTime(notif.timestamp)}
              </div>

              {/* MIDDLE ROW: DYNAMIC CONTENT BASED ON NOTIFICATION TYPE */}
              <div className="flex items-start gap-3">
                {/* --- RENDERING ORDER NOTIFICATION TYPE --- */}
                {notif.type === "orders" && (
                  <>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                      {notif.imagePlaceholder ? (
                        <img
                          src={notif.imagePlaceholder}
                          alt="buyer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-5 h-5 text-[#073E7D]" />
                      )}
                    </div>
                    <div className="flex-1 pr-6">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Order Update
                      </h4>
                      <p className="text-sm font-black text-slate-800 mt-0.5">
                        Buyer: {notif.buyerName}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                        {notif.orderDescription ||
                          "New P2P telecom trade pipeline instance has been initialized safely."}
                      </p>
                    </div>
                  </>
                )}

                {/* --- RENDERING WALLET NOTIFICATION TYPE --- */}
                {notif.type === "wallet" && (
                  <>
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${
                        notif.action === "RECEIVED_MONEY"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : "bg-rose-50 border-rose-200 text-rose-600"
                      }`}
                    >
                      {notif.action === "RECEIVED_MONEY" ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 pr-6">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {notif.action === "RECEIVED_MONEY"
                          ? "Money Received"
                          : "Withdrawal Executed"}
                      </h4>
                      <div className="text-xs text-slate-600 mt-1 space-y-0.5 font-medium">
                        <p className="text-sm font-black text-slate-800 mb-1">
                          {notif.action === "RECEIVED_MONEY" ? "+" : "-"} TK{" "}
                          {notif.amount}
                        </p>
                        <p>
                          <span className="text-slate-400">Account ID:</span>{" "}
                          <span className="font-mono font-bold text-slate-700">
                            {notif.senderId}
                          </span>
                        </p>
                        <p>
                          <span className="text-slate-400">TrxID:</span>{" "}
                          <span className="font-mono text-slate-700 select-all">
                            {notif.trxId}
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* BOTTOM RIGHT CORNER: READ / UNREAD VISUAL BUBBLE MARK */}
              <div className="absolute bottom-3 right-4">
                {!notif.isRead && (
                  <span className="text-[10px] text-blue-600 bg-blue-100 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                    New
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
