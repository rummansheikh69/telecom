import React, { useState } from "react";
import {
  CheckCircle2,
  Search,
  Copy,
  Check,
  TrendingUp,
  Receipt,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";

export default function AdminPaidLoans() {
  // Mock Paid Loans Data
  const [paidLoans] = useState([
    {
      id: "PL-101",
      userId: "U1024",
      userName: "Ayesha Siddiqua",
      trxId: "LN882PL9M",
      amountPaid: 10000,
      takeLoanDate: "06/08/26 - 09:45 AM",
      paidDate: "07/08/26 - 11:10 AM",
      status: "Settled",
    },
    {
      id: "PL-102",
      userId: "U1052",
      userName: "Sabbir Rahman",
      trxId: "LN441XX99",
      amountPaid: 1000,
      takeLoanDate: "04/08/26 - 11:00 AM",
      paidDate: "05/08/26 - 08:30 AM",
      status: "Settled",
    },
    {
      id: "PL-103",
      userId: "U1091",
      userName: "Mahmudul Hasan",
      trxId: "LN332KK11",
      amountPaid: 5000,
      takeLoanDate: "03/08/26 - 02:15 PM",
      paidDate: "04/08/26 - 10:00 AM",
      status: "Settled",
    },
    {
      id: "PL-104",
      userId: "U1011",
      userName: "Rifat Chowdhury",
      trxId: "LN902MM44",
      amountPaid: 2500,
      takeLoanDate: "01/08/26 - 05:20 PM",
      paidDate: "02/08/26 - 09:15 AM",
      status: "Settled",
    },
    {
      id: "PL-105",
      userId: "U1067",
      userName: "Farhana Yasmin",
      trxId: "LN118ZZ00",
      amountPaid: 15000,
      takeLoanDate: "30/07/26 - 08:00 AM",
      paidDate: "31/07/26 - 11:55 AM",
      status: "Settled",
    },
  ]);

  // Search & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const INITIAL_VISIBLE = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [copiedTxId, setCopiedTxId] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedTxId(text);
    setTimeout(() => setCopiedTxId(""), 2000);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(INITIAL_VISIBLE);
  };

  // Stat Calculation
  const totalPaidSum = paidLoans.reduce(
    (acc, curr) => acc + curr.amountPaid,
    0,
  );

  // Search Filter
  const filteredPaidLoans = paidLoans.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      item.userName.toLowerCase().includes(query) ||
      item.userId.toLowerCase().includes(query) ||
      item.trxId.toLowerCase().includes(query)
    );
  });

  return (
    <AdminLayout>
      <div className="pb-12 space-y-3 max-w-4xl mx-auto relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Paid Loan History
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Overview of all fully repaid micro-loan transactions
            </p>
          </div>
        </div>

        {/* Top Single Stat Card */}
        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 text-white p-3.5 rounded-2xl border border-emerald-800/30 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Total Repaid Amount
            </span>
            <div className="p-1.5 bg-emerald-500/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-xl font-black text-emerald-400">
            TK {totalPaidSum.toLocaleString()}
          </h2>
          <div className="flex items-center gap-1 text-[10px] text-slate-300 font-semibold">
            <Receipt className="w-3 h-3 text-emerald-400" />
            <span>Full Recoveries Cleared</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="sticky top-0 left-0 z-10">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Borrower Name, UID, or TrxID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition shadow-sm"
          />
        </div>

        {/* Paid Loan Cards List */}
        <div className="space-y-2.5">
          {filteredPaidLoans.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-500">
                No matching paid loan records found
              </p>
            </div>
          ) : (
            filteredPaidLoans.slice(0, visibleCount).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2.5"
              >
                {/* Header Row: TrxID & Copy */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      #{item.id}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {item.trxId}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.trxId)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      {copiedTxId === item.trxId ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {item.status}
                  </span>
                </div>

                {/* Main Borrower Info Grid */}
                <div className="grid grid-cols-12 gap-1 items-center bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs">
                  {/* Borrower Name & UID */}
                  <div className="col-span-6 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Borrower
                    </span>
                    <h4 className="font-bold text-slate-800 truncate">
                      {item.userName}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#073E7D]">
                      UID: {item.userId}
                    </p>
                  </div>

                  {/* Amount Paid */}
                  <div className="col-span-6 text-right space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Repaid Amount
                    </span>
                    <p className="text-xs font-black text-emerald-600">
                      TK {item.amountPaid.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Clean Date Footer */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                  <span className="font-medium">
                    Taken: {item.takeLoanDate}
                  </span>
                  <span className="font-semibold text-emerald-700">
                    Paid: {item.paidDate}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* See More Button */}
          {filteredPaidLoans.length > visibleCount && (
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
