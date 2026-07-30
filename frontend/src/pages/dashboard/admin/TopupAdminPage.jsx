import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  User,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";

const INITIAL_TOPUP_ORDERS = [
  {
    id: "TOP-9901",
    trxId: "TOP772910X1",
    user: {
      name: "Tanvir Ahmed",
      phone: "+8801700000000",
      email: "tanvir@example.com",
    },
    targetPhone: "01711223344",
    operator: {
      name: "Grameenphone",
      code: "GP",
      logo: "https://placehold.co/100x100/00a4e4/white?text=GP",
    },
    amount: 500,
    notes: "Please recharge emergency internet pack.",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "TOP-9902",
    trxId: "TOP772910X2",
    user: {
      name: "Sabbir Hossain",
      phone: "+8801811112222",
      email: "sabbir@example.com",
    },
    targetPhone: "01883372867",
    operator: {
      name: "Robi",
      code: "Robi",
      logo: "https://placehold.co/100x100/e31837/white?text=Robi",
    },
    amount: 1000,
    notes: "Regular talktime recharge",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "TOP-9880",
    trxId: "TOP772900A1",
    user: {
      name: "Nusrat Jahan",
      phone: "+8801922334455",
      email: "nusrat@example.com",
    },
    targetPhone: "01912345678",
    operator: {
      name: "Banglalink",
      code: "BL",
      logo: "https://placehold.co/100x100/ff6600/white?text=BL",
    },
    amount: 200,
    notes: "",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "TOP-9875",
    trxId: "TOP772899B2",
    user: {
      name: "Arif Khan",
      phone: "+8801555667788",
      email: "arif@example.com",
    },
    targetPhone: "01511223344",
    operator: {
      name: "Teletalk",
      code: "Teletalk",
      logo: "https://placehold.co/100x100/5cb85c/white?text=TT",
    },
    amount: 150,
    notes: "Monthly package combo",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
];

const COMPLETED_ITEMS_PER_PAGE = 2;

function getTimeAgo(dateString) {
  const diffInSeconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (diffInSeconds < 60) return "Just now";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TopupAdminPage({ userRole = "ceo" }) {
  const [orders, setOrders] = useState(INITIAL_TOPUP_ORDERS);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedVisibleCount, setCompletedVisibleCount] = useState(
    COMPLETED_ITEMS_PER_PAGE,
  );
  const [copiedId, setCopiedId] = useState(null);
  const [expandedUserCard, setExpandedUserCard] = useState({});

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleUserAccordion = (id) => {
    setExpandedUserCard((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab =
        activeTab === "pending"
          ? order.status === "pending"
          : order.status === "completed" || order.status === "rejected";

      if (!matchesTab) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        order.trxId.toLowerCase().includes(q) ||
        order.targetPhone.toLowerCase().includes(q) ||
        order.user.name.toLowerCase().includes(q) ||
        order.user.phone.toLowerCase().includes(q) ||
        order.operator.name.toLowerCase().includes(q)
      );
    });
  }, [orders, activeTab, searchQuery]);

  const visibleOrders = useMemo(() => {
    if (activeTab === "pending") return filteredOrders;
    return filteredOrders.slice(0, completedVisibleCount);
  }, [filteredOrders, activeTab, completedVisibleCount]);

  const handleLoadMore = () => {
    setCompletedVisibleCount((prev) => prev + COMPLETED_ITEMS_PER_PAGE);
  };

  return (
    <AdminLayout userRole={userRole}>
      <div className="space-y-4 pb-12">
        {/* Header */}
        <div>
          <h1 className="text-base font-extrabold text-slate-800">
            Topup Request Manager
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage and review mobile recharge orders.
          </p>
        </div>

        {/* Tab Controls (Markers removed as requested) */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("pending");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition w-full ${
              activeTab === "pending"
                ? "bg-[#073E7D] text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Requests</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("completed");
              setSearchQuery("");
              setCompletedVisibleCount(COMPLETED_ITEMS_PER_PAGE);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition w-full ${
              activeTab === "completed"
                ? "bg-[#073E7D] text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed Orders</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by TrxID, target phone, or user..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCompletedVisibleCount(COMPLETED_ITEMS_PER_PAGE);
            }}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#073E7D] shadow-sm"
          />
        </div>

        {/* Card List */}
        <div className="space-y-3">
          {visibleOrders.length > 0 ? (
            visibleOrders.map((order) => {
              const isUserExpanded = !!expandedUserCard[order.id];

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3"
                >
                  {/* Top Bar: Target Number (Left) & Time (Right) */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#073E7D]">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">
                          Target Number
                        </span>
                        <span className="text-sm font-black text-slate-800 tracking-wide">
                          {order.targetPhone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{getTimeAgo(order.createdAt)}</span>
                    </div>
                  </div>

                  {/* Middle Content Panel */}
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      {/* Operator Logo & Name */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-white border border-slate-200 p-0.5">
                          <img
                            src={order.operator.logo}
                            alt={order.operator.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">
                            Operator
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {order.operator.name}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none mb-1">
                          Status
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold capitalize ${
                            order.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : order.status === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Amount & TrxID */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">
                          Amount
                        </span>
                        <span className="text-base font-black text-[#073E7D]">
                          TK {order.amount.toFixed(2)}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">
                          TrxID
                        </span>
                        <div className="flex items-center gap-1 mt-0.5 justify-end">
                          <span className="text-xs font-mono font-bold text-slate-700">
                            {order.trxId}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(order.trxId)}
                            className="p-1 rounded bg-white border text-slate-400 hover:text-slate-600 transition"
                          >
                            {copiedId === order.trxId ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes statement if available */}
                  {order.notes && (
                    <div className="flex items-start gap-1.5 bg-amber-50/60 border-l-2 border-amber-400 p-2 rounded-r-lg">
                      <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] font-medium text-slate-600 italic">
                        "{order.notes}"
                      </p>
                    </div>
                  )}

                  {/* Actions for Pending */}
                  {order.status === "pending" && (
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "rejected")}
                        className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition active:scale-95"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateStatus(order.id, "completed")
                        }
                        className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Complete</span>
                      </button>
                    </div>
                  )}

                  {/* User Info Accordion at Bottom */}
                  <div className="border-t border-slate-100 pt-2">
                    <button
                      type="button"
                      onClick={() => toggleUserAccordion(order.id)}
                      className="w-full flex items-center justify-between text-[11px] font-bold text-slate-500 hover:text-slate-700 py-1 transition"
                    >
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Customer Info</span>
                      </div>
                      {isUserExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {isUserExpanded && (
                      <div className="mt-2 p-2.5 bg-slate-50 rounded-xl text-xs space-y-1 font-medium text-slate-600 border border-slate-200/60 animate-fadeIn">
                        <p>
                          <span className="font-bold text-slate-700">
                            Name:
                          </span>{" "}
                          {order.user.name}
                        </p>
                        <p>
                          <span className="font-bold text-slate-700">
                            Phone:
                          </span>{" "}
                          {order.user.phone}
                        </p>
                        <p>
                          <span className="font-bold text-slate-700">
                            Email:
                          </span>{" "}
                          {order.user.email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-1">
              <p className="text-xs font-bold text-slate-600">
                No topup orders found
              </p>
            </div>
          )}
        </div>

        {/* Clean See More Button on Completed Tab */}
        {activeTab === "completed" &&
          completedVisibleCount < filteredOrders.length && (
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
      </div>
    </AdminLayout>
  );
}
