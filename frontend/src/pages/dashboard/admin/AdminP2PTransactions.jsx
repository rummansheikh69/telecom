import React, { useState } from "react";
import {
  ArrowRightLeft,
  Search,
  UserCheck,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Filter,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";

export default function AdminP2PTransactions() {
  // Mock P2P Transaction Ledger Data
  const [p2pLedger, setP2pLedger] = useState([
    {
      id: "P2P-9901",
      senderName: "Tanvir Ahmed",
      senderUid: "u105",
      receiverName: "Ayesha Siddiqua",
      receiverUid: "u102",
      sendAmount: 1500,
      receivedAmount: 1485,
      fee: 15,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2P_99210",
      date: "03:15 PM - 06/08/26",
    },
    {
      id: "P2P-9902",
      senderName: "Rony Khan",
      senderUid: "u101",
      receiverName: "Sultana Razia",
      receiverUid: "u109",
      sendAmount: 5000,
      receivedAmount: 4950,
      fee: 50,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2PTX_992102",
      date: "01:40 PM - 06/08/26",
    },
    {
      id: "P2P-9903",
      senderName: "Hasan Mahmud",
      senderUid: "u112",
      receiverName: "Tanvir Ahmed",
      receiverUid: "u105",
      sendAmount: 800,
      receivedAmount: 792,
      fee: 8,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2PTX_992103",
      date: "11:10 AM - 05/08/26",
    },
    {
      id: "P2P-9904",
      senderName: "Hasan Mahmud",
      senderUid: "u112",
      receiverName: "Tanvir Ahmed",
      receiverUid: "u105",
      sendAmount: 800,
      receivedAmount: 792,
      fee: 8,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2PTX_992104",
      date: "11:10 AM - 05/08/26",
    },
    {
      id: "P2P-9905",
      senderName: "Hasan Mahmud",
      senderUid: "u112",
      receiverName: "Tanvir Ahmed",
      receiverUid: "u105",
      sendAmount: 800,
      receivedAmount: 792,
      fee: 8,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2PTX_992105",
      date: "11:10 AM - 05/08/26",
    },
    {
      id: "P2P-9906",
      senderName: "Hasan Mahmud",
      senderUid: "u112",
      receiverName: "Tanvir Ahmed",
      receiverUid: "u105",
      sendAmount: 800,
      receivedAmount: 792,
      fee: 8,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2PTX_992106",
      date: "11:10 AM - 05/08/26",
    },
    {
      id: "P2P-9907",
      senderName: "Hasan Mahmud",
      senderUid: "u112",
      receiverName: "Tanvir Ahmed",
      receiverUid: "u105",
      sendAmount: 800,
      receivedAmount: 792,
      fee: 8,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2PTX_992107",
      date: "11:10 AM - 05/08/26",
    },
    {
      id: "P2P-9908",
      senderName: "Kazi Nabil",
      senderUid: "u120",
      receiverName: "Farhana Islam",
      receiverUid: "u115",
      sendAmount: 3000,
      receivedAmount: 2970,
      fee: 30,
      rate: "1:1 BDT",
      status: "Completed",
      txId: "P2PTX_992108",
      date: "09:20 AM - 05/08/26",
    },
  ]);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination / Load More State
  const [visibleCount, setVisibleCount] = useState(3);

  // Filtered dataset based on search inputs
  const filteredLedger = p2pLedger.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.senderName.toLowerCase().includes(query) ||
      item.senderUid.toLowerCase().includes(query) ||
      item.receiverName.toLowerCase().includes(query) ||
      item.receiverUid.toLowerCase().includes(query) ||
      item.txId.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    );
  });

  return (
    <AdminLayout>
      <div className=" pb-12 space-y-3 max-w-4xl mx-auto relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
              <ArrowRightLeft className="w-4 h-4 text-[#073E7D]" />
              P2P Deal Transactions
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Live audit trail of peer-to-peer transfers & fee collection
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className=" sticky top-0 left-0">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Sender/Receiver Name, UID, or TxID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(3); // Resets view so search shows top results instantly
            }}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#073E7D] transition shadow-sm"
          />
        </div>

        {/* Transaction Cards List */}
        <div className="space-y-2.5">
          {filteredLedger.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-500">
                No matching P2P transactions found
              </p>
            </div>
          ) : (
            filteredLedger.slice(0, visibleCount).map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2.5"
              >
                {/* Card Top Header: TxID & Status */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      #{tx.txId}
                    </span>
                  </div>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {tx.status}
                  </span>
                </div>

                {/* Sender -> Receiver Dynamic Row */}
                <div className="grid grid-cols-11 gap-1 items-center bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs">
                  {/* Sender Details */}
                  <div className="col-span-5 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Sender
                    </span>
                    <h4 className="font-bold text-slate-800 truncate">
                      {tx.senderName}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#073E7D]">
                      UID: {tx.senderUid}
                    </p>
                    <p className="text-[11px] font-black text-rose-600">
                      -৳{tx.sendAmount.toFixed(2)}
                    </p>
                  </div>

                  {/* Transfer Direction Indicator */}
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="p-1 rounded-full bg-white border border-slate-200 shadow-xs text-slate-400">
                      <ArrowRightLeft className="w-3 h-3 text-[#073E7D]" />
                    </div>
                  </div>

                  {/* Receiver Details */}
                  <div className="col-span-5 text-right space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Receiver
                    </span>
                    <h4 className="font-bold text-slate-800 truncate">
                      {tx.receiverName}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#073E7D]">
                      UID: {tx.receiverUid}
                    </p>
                    <p className="text-[11px] font-black text-emerald-600">
                      +৳{tx.receivedAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Audit Grid: Fee, Rate & Timestamp */}
                <div className="flex justify-center items-center text-[10px] text-slate-500 pt-0.5">
                  <span className="font-medium text-slate-400">{tx.date}</span>
                </div>
              </div>
            ))
          )}

          {/* See More Button */}
          {filteredLedger.length > visibleCount && (
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
    </AdminLayout>
  );
}
