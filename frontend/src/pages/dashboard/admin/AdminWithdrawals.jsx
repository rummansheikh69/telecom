import React, { useState } from "react";
import {
  ArrowUpRight,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  Eye,
  ShieldAlert,
  Wallet,
  Copy,
  Check,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { MotherModal } from "../../../components/modals/MotherModal";

export default function AdminWithdrawals() {
  // Mock Withdrawal Requests State (Unique IDs Fixed)
  const [withdrawals, setWithdrawals] = useState([
    {
      id: "WTH-901",
      userId: "U1013",
      userName: "Rumman Hossain",
      userPhone: "01712345678",
      txId: "WTH918FX2K",
      amount: 1500,
      method: "Bkash",
      walletNumber: "01712345678",
      status: "Pending",
      date: "10:12 AM - 17/04/26",
    },
    {
      id: "WTH-902",
      userId: "U1014",
      userName: "Rumman Hossain",
      userPhone: "01712345678",
      txId: "WTH918FX2L",
      amount: 1500,
      method: "Bkash",
      walletNumber: "01712345678",
      status: "Pending",
      date: "10:15 AM - 17/04/26",
    },
    {
      id: "WTH-903",
      userId: "U1015",
      userName: "Rumman Hossain",
      userPhone: "01712345678",
      txId: "WTH918FX2M",
      amount: 1500,
      method: "Bkash",
      walletNumber: "01712345678",
      status: "Pending",
      date: "10:20 AM - 17/04/26",
    },
    {
      id: "WTH-904",
      userId: "U1016",
      userName: "Rumman Hossain",
      userPhone: "01712345678",
      txId: "WTH918FX2N",
      amount: 1500,
      method: "Bkash",
      walletNumber: "01712345678",
      status: "Pending",
      date: "10:25 AM - 17/04/26",
    },
    {
      id: "WTH-905",
      userId: "U1017",
      userName: "Rumman Hossain",
      userPhone: "01712345678",
      txId: "WTH918FX2O",
      amount: 1500,
      method: "Bkash",
      walletNumber: "01712345678",
      status: "Pending",
      date: "10:30 AM - 17/04/26",
    },
    {
      id: "WTH-906",
      userId: "U1024",
      userName: "Ayesha Siddiqua",
      userPhone: "01822334455",
      txId: "WTH882PL9M",
      amount: 3200,
      method: "Nagad",
      walletNumber: "01822334455",
      status: "Pending",
      date: "09:45 AM - 17/04/26",
    },
    {
      id: "WTH-907",
      userId: "U1005",
      userName: "Tanvir Ahmed",
      userPhone: "01911223344",
      txId: "WTH771QR3X",
      amount: 500,
      method: "Rocket",
      walletNumber: "019112233440",
      status: "Approved",
      date: "04:20 PM - 16/04/26",
    },
    {
      id: "WTH-908",
      userId: "U1088",
      userName: "Kazi Nabil",
      userPhone: "01600112233",
      txId: "WTH550BN8K",
      amount: 12000,
      method: "Binance",
      walletNumber: "847291048",
      status: "Rejected",
      rejectReason: "Incorrect Binance Pay ID provided",
      date: "02:10 PM - 16/04/26",
    },
    {
      id: "WTH-909",
      userId: "U1013",
      userName: "Rumman Hossain",
      userPhone: "01712345678",
      txId: "WTH441XX99",
      amount: 2000,
      method: "Bkash",
      walletNumber: "01712345678",
      status: "Approved",
      date: "11:00 AM - 15/04/26",
    },
  ]);

  // Tab State: Pending | Approved | Rejected
  const [activeTab, setActiveTab] = useState("Pending");

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination / See More State
  const INITIAL_VISIBLE = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Selected item for MotherModal
  const [selectedTx, setSelectedTx] = useState(null);
  const [rejectReasonInput, setRejectReasonInput] = useState("");
  const [copiedTxId, setCopiedTxId] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedTxId(text);
    setTimeout(() => setCopiedTxId(""), 2000);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(INITIAL_VISIBLE); // Reset visible count on search change
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(INITIAL_VISIBLE); // Reset visible count on tab switch
  };

  // Status Action Handlers
  const handleApprove = (id) => {
    setWithdrawals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item,
      ),
    );
    setSelectedTx(null);
  };

  const handleReject = (id) => {
    if (!rejectReasonInput.trim()) return;
    setWithdrawals((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Rejected",
              rejectReason: rejectReasonInput,
            }
          : item,
      ),
    );
    setRejectReasonInput("");
    setSelectedTx(null);
  };

  // Filter Logic (Filtered by Active Tab & Search Query)
  const filteredWithdrawals = withdrawals.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesTab = item.status.toLowerCase() === activeTab.toLowerCase();

    if (!query) return matchesTab;

    return (
      matchesTab &&
      (item.userName.toLowerCase().includes(query) ||
        item.userId.toLowerCase().includes(query) ||
        item.txId.toLowerCase().includes(query) ||
        item.walletNumber.toLowerCase().includes(query))
    );
  });

  // Pending Count Badge ONLY
  const pendingCount = withdrawals.filter((w) => w.status === "Pending").length;

  return (
    <AdminLayout>
      <div className="pb-12 space-y-3 max-w-4xl mx-auto relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
              <ArrowUpRight className="w-4 h-4 text-[#073E7D]" />
              Withdrawal Requests
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage and process user payout requests
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="sticky top-0 left-0 z-10">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by User Name, UID, TxID, or Wallet Number..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#073E7D] transition shadow-sm"
          />
        </div>

        {/* 3 Tabs: Pending, Approved, Rejected (Number Badge ONLY on Pending) */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {["Pending", "Approved", "Rejected"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#073E7D] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{tab}</span>
                {/* Number Badge strictly on Pending tab */}
                {tab === "Pending" && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive
                        ? "bg-amber-400 text-slate-900"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Transaction Cards List */}
        <div className="space-y-2.5">
          {filteredWithdrawals.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-500">
                No {activeTab.toLowerCase()} withdrawal requests found
              </p>
            </div>
          ) : (
            filteredWithdrawals.slice(0, visibleCount).map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2.5"
              >
                {/* Header Row: TxID & Status Badge */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-slate-800">
                      #{tx.txId}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(tx.txId)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      {copiedTxId === tx.txId ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border flex items-center gap-1 ${
                      tx.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : tx.status === "Rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {tx.status === "Approved" && (
                      <CheckCircle2 className="w-3 h-3" />
                    )}
                    {tx.status === "Rejected" && (
                      <XCircle className="w-3 h-3" />
                    )}
                    {tx.status === "Pending" && <Clock className="w-3 h-3" />}
                    {tx.status}
                  </span>
                </div>

                {/* Main Request Grid */}
                <div className="grid grid-cols-11 gap-1 items-center bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs">
                  {/* User Details */}
                  <div className="col-span-4 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      User
                    </span>
                    <h4 className="font-bold text-slate-800 truncate">
                      {tx.userName}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#073E7D] uppercase">
                      UID: {tx.userId}
                    </p>
                  </div>

                  {/* Method & Account */}
                  <div className="col-span-4 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Method & Account
                    </span>
                    <span className="inline-block bg-blue-100 text-[#073E7D] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                      {tx.method}
                    </span>
                    <p className="text-[10px] font-mono font-bold text-slate-700 truncate">
                      {tx.walletNumber}
                    </p>
                  </div>

                  {/* Amount Requested */}
                  <div className="col-span-3 text-right space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Amount
                    </span>
                    <p className="text-xs font-black text-rose-600">
                      -TK {tx.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Reject Reason Alert if Rejected */}
                {tx.status === "Rejected" && tx.rejectReason && (
                  <div className="bg-rose-50 border border-rose-100 p-2 rounded-xl text-[10px] text-rose-700 flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Reason:</strong>{" "}
                      {tx.rejectReason}
                    </div>
                  </div>
                )}

                {/* Footer Timestamp & Action Button */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-0.5">
                  <span className="font-medium text-slate-400">{tx.date}</span>

                  {tx.status === "Pending" ? (
                    <button
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      className="px-2.5 py-1 bg-[#073E7D] text-white rounded-lg font-bold hover:bg-[#052d5b] transition flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Process
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">
                      Processed
                    </span>
                  )}
                </div>
              </div>
            ))
          )}

          {/* See More Button */}
          {filteredWithdrawals.length > visibleCount && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="w-full h-9 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-1 transition mt-2"
            >
              <span>See More</span>
            </button>
          )}
        </div>
      </div>

      {/* MotherModal Wrapper for Processing Payout */}
      {selectedTx && (
        <MotherModal
          isOpen={!!selectedTx}
          onClose={() => {
            setSelectedTx(null);
            setRejectReasonInput("");
          }}
          title={`Process Payout #${selectedTx.id}`}
        >
          <div className="space-y-4">
            {/* Modal Summary Details */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">User:</span>
                <span className="font-bold text-slate-800">
                  {selectedTx.userName} ({selectedTx.userId})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gateway:</span>
                <span className="font-bold text-[#073E7D]">
                  {selectedTx.method}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account Number:</span>
                <span className="font-mono font-bold text-slate-800">
                  {selectedTx.walletNumber}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span className="text-slate-400">Payout Amount:</span>
                <span className="font-black text-rose-600 text-sm">
                  TK {selectedTx.amount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Rejection Note Input */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                Rejection Reason (Required if rejecting)
              </label>
              <input
                type="text"
                placeholder="e.g., Invalid account details"
                value={rejectReasonInput}
                onChange={(e) => setRejectReasonInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500 font-semibold"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleReject(selectedTx.id)}
                disabled={!rejectReasonInput.trim()}
                className="flex-1 py-2.5 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 hover:bg-rose-100 disabled:opacity-50 transition"
              >
                Reject Payout
              </button>
              <button
                type="button"
                onClick={() => handleApprove(selectedTx.id)}
                className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-sm transition"
              >
                Approve & Paid
              </button>
            </div>
          </div>
        </MotherModal>
      )}
    </AdminLayout>
  );
}
