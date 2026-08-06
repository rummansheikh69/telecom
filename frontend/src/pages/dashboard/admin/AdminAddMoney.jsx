import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Settings2,
  ImageIcon,
  ShieldCheck,
  AlertCircle,
  Search,
  ChevronDown,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { MethodManagerModal } from "../../../components/modals/MethodManagerModal";
import { AddMoneyConfirmModal } from "../../../components/modals/AddMoneyConfirmModal";
import { DeclineAddMoneyModal } from "../../../components/modals/DeclineAddMoneyModal";
import { MotherModal } from "../../../components/modals/MotherModal";

export default function AdminAddMoney() {
  const [activeTab, setActiveTab] = useState("requests");
  const [historySearchQuery, setHistorySearchQuery] = useState("");
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(5);

  // Gateway Configuration State
  const [gatewayConfig, setGatewayConfig] = useState({
    walletNumbers: {
      bkash: "01401458564",
      nagad: "01601458564",
      rocket: "01401458564-9",
      binance: "9482015",
    },
    banks: [
      {
        id: "ebl",
        bankName: "Eastern Bank PLC (EBL)",
        title: "Rony Khan Enterprises",
        account: "1042930492031",
        branch: "Uttara Branch",
        routingNumber: "070261415",
      },
    ],
  });

  // Pending Add Money Requests
  const [requestsList, setRequestsList] = useState([
    {
      id: "REQ-901",
      userId: "u102",
      userName: "Ayesha Siddiqua",
      amount: 5000,
      method: "Bkash",
      txId: "BK9X82N10Z",
      screenshot:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600",
      date: "10:15 AM - 17/04/26",
    },
  ]);

  // Processed History Records
  const [historyList, setHistoryList] = useState([
    {
      id: "REQ-888",
      userId: "u105",
      userName: "Tanvir Ahmed",
      amount: 2500,
      method: "Nagad",
      txId: "NG77391029",
      screenshot:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600",
      date: "09:00 AM - 16/04/26",
      status: "Accepted",
      acceptedBy: "Super Admin (Rony)",
      processedAt: "09:12 AM - 16/04/26",
    },
    {
      id: "REQ-887",
      userId: "u109",
      userName: "Sultana Razia",
      amount: 1000,
      method: "Rocket",
      txId: "RK1029384",
      screenshot:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600",
      date: "08:15 AM - 15/04/26",
      status: "Declined",
      acceptedBy: "Admin (Moderator-2)",
      declineReason: "Invalid Transaction ID provided",
      processedAt: "08:30 AM - 15/04/26",
    },
    {
      id: "REQ-887",
      userId: "u109",
      userName: "Sultana Razia",
      amount: 1000,
      method: "Rocket",
      txId: "RK1029384",
      screenshot:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600",
      date: "08:15 AM - 15/04/26",
      status: "Declined",
      acceptedBy: "Admin (Moderator-2)",
      declineReason: "Invalid Transaction ID provided",
      processedAt: "08:30 AM - 15/04/26",
    },
  ]);

  // Modal States
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Accept Confirmation Modal State
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedAcceptReq, setSelectedAcceptReq] = useState(null);

  // Dedicated Decline Modal State
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedDeclineReq, setSelectedDeclineReq] = useState(null);

  // Open Handlers
  const handleOpenAccept = (req) => {
    setSelectedAcceptReq(req);
    setIsAcceptModalOpen(true);
  };

  const handleOpenDecline = (req) => {
    setSelectedDeclineReq(req);
    setIsDeclineModalOpen(true);
  };

  // Confirm Actions
  const handleConfirmAccept = () => {
    if (!selectedAcceptReq) return;

    setHistoryList([
      {
        ...selectedAcceptReq,
        status: "Accepted",
        acceptedBy: "Current Admin (You)",
        processedAt: new Date().toLocaleString(),
      },
      ...historyList,
    ]);

    setRequestsList(requestsList.filter((r) => r.id !== selectedAcceptReq.id));
    setIsAcceptModalOpen(false);
    setSelectedAcceptReq(null);
  };

  const handleConfirmDecline = (reason) => {
    if (!selectedDeclineReq) return;

    setHistoryList([
      {
        ...selectedDeclineReq,
        status: "Declined",
        declineReason: reason,
        acceptedBy: "Current Admin (You)",
        processedAt: new Date().toLocaleString(),
      },
      ...historyList,
    ]);

    setRequestsList(requestsList.filter((r) => r.id !== selectedDeclineReq.id));
    setIsDeclineModalOpen(false);
    setSelectedDeclineReq(null);
  };

  // Filter History Data by Search Query
  const filteredHistory = historyList.filter(
    (item) =>
      item.userId.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
      item.userName.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
      item.txId.toLowerCase().includes(historySearchQuery.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-3 max-w-4xl mx-auto pb-12">
        {/* Top Header & Gateway Manager Button */}
        <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-800">
              Add Money
            </h1>
            <p className="text-[11px] text-slate-400">
              Review requests & payment options
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsManagerOpen(true)}
            className="px-3 py-1.5 bg-[#073E7D] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-[#052d5b] transition"
          >
            <Settings2 className="w-3.5 h-3.5" /> Gateways
          </button>
        </div>

        {/* Sticky Tabs Navigation */}
        <div className="sticky top-0 z-20 ">
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("requests")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === "requests"
                  ? "bg-[#073E7D] text-white shadow-md"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Requests ({requestsList.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-[#073E7D] text-white shadow-md"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REQUESTS TAB                                                              */}
        {/* ========================================================================= */}
        {activeTab === "requests" && (
          <div className="space-y-2.5">
            {requestsList.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200">
                <p className="text-xs font-bold text-slate-500">
                  No pending add money requests
                </p>
              </div>
            ) : (
              requestsList.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200 shadow-sm space-y-2.5"
                >
                  {/* Top Bar: User Details */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                        {req.userName}
                      </h3>
                      <p className="text-[11px] font-extrabold text-[#073E7D] uppercase">
                        UID: {req.userId}
                      </p>
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      ৳{req.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Transaction Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">
                        Method
                      </span>
                      <span className="font-bold text-slate-700">
                        {req.method}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">
                        TxID
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {req.txId}
                      </span>
                    </div>
                  </div>

                  {/* Proof Screenshot & Date */}
                  <div className="flex justify-between items-center text-xs pt-0.5">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(req.screenshot)}
                      className="text-[#073E7D] font-bold text-[11px] flex items-center gap-1 hover:underline"
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> View Proof
                    </button>
                    <span className="text-[10px] text-slate-400">
                      {req.date}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenDecline(req)}
                      className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl flex justify-center items-center gap-1 border border-rose-100 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenAccept(req)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex justify-center items-center gap-1 shadow-sm transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accept
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* HISTORY TAB                                                               */}
        {/* ========================================================================= */}
        {activeTab === "history" && (
          <div className="space-y-2.5 relative">
            {/* Search Bar for History Tab Only */}
            <div className="sticky top-12 z-20">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search UID, Name, or Transaction ID in history..."
                value={historySearchQuery}
                onChange={(e) => setHistorySearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#073E7D] shadow-sm transition"
              />
            </div>

            {filteredHistory.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200">
                <p className="text-xs font-bold text-slate-500">
                  No matching history records found
                </p>
              </div>
            ) : (
              <>
                {filteredHistory.slice(0, visibleHistoryCount).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200 shadow-sm space-y-2.5"
                  >
                    {/* Top Bar: User Details & Status */}
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                          {item.userName}
                        </h3>
                        <p className="text-[11px] font-extrabold text-[#073E7D] uppercase">
                          UID: {item.userId}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border ${
                            item.status === "Accepted"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {item.status}
                        </span>
                        <p className="text-xs font-black text-slate-900 mt-1">
                          ৳{item.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Transaction Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase">
                          Method
                        </span>
                        <span className="font-bold text-slate-700">
                          {item.method}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase">
                          TxID
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          {item.txId}
                        </span>
                      </div>
                    </div>

                    {/* Rejection Note (If Declined) */}
                    {item.status === "Declined" && item.declineReason && (
                      <div className="bg-rose-50 p-2 rounded-xl border border-rose-100 text-xs flex items-start gap-1.5 text-rose-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
                        <div>
                          <span className="font-bold block text-[11px]">
                            Reason for Rejection:
                          </span>
                          <span className="font-medium text-[10px]">
                            {item.declineReason}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Proof Screenshot & Admin Audit Footer */}
                    <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setPreviewImage(item.screenshot)}
                        className="text-[#073E7D] font-bold text-[11px] flex items-center gap-1 hover:underline"
                      >
                        <ImageIcon className="w-3.5 h-3.5" /> View Proof
                      </button>
                      <div className="text-right text-[10px] text-slate-400">
                        <p className="font-bold text-slate-600 flex items-center gap-1 justify-end">
                          <UserCheck className="w-3 h-3 text-[#073E7D]" />
                          {item.acceptedBy}
                        </p>
                        <p>{item.processedAt}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* See More Button */}
                {visibleHistoryCount < filteredHistory.length && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleHistoryCount((prev) => prev + 5)}
                      className="w-full h-9 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-1.5 transition"
                    >
                      <span>See More </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* External Gateways CRUD Modal */}
      <MethodManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        gatewayData={gatewayConfig}
        onSave={(updated) => setGatewayConfig(updated)}
      />

      {/* Dedicated Decline Modal */}
      <DeclineAddMoneyModal
        isOpen={isDeclineModalOpen}
        onClose={() => {
          setIsDeclineModalOpen(false);
          setSelectedDeclineReq(null);
        }}
        request={selectedDeclineReq}
        onConfirmDecline={handleConfirmDecline}
      />

      {/* Accept Confirmation Modal */}
      <AddMoneyConfirmModal
        isOpen={isAcceptModalOpen}
        onClose={() => {
          setIsAcceptModalOpen(false);
          setSelectedAcceptReq(null);
        }}
        type="accept"
        request={selectedAcceptReq}
        onConfirm={handleConfirmAccept}
      />

      {/* Proof Screenshot Modal */}
      <MotherModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        title="Payment Proof Screenshot"
      >
        {previewImage && (
          <div className="space-y-3">
            <div className="max-h-[60vh] overflow-auto rounded-xl border border-slate-200 bg-black flex items-center justify-center">
              <img
                src={previewImage}
                alt="Payment Proof"
                className="w-full object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="w-full py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        )}
      </MotherModal>
    </AdminLayout>
  );
}
