import React, { useState } from "react";
import {
  Landmark,
  Search,
  ChevronRight,
  Clock,
  AlertCircle,
  Copy,
  Check,
  TrendingUp,
  Users,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { RiHistoryFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function AdminTakeLoan() {
  // Mock Take Loan Data
  const [loans] = useState([
    {
      id: "LN-901",
      userId: "U1013",
      userName: "Rumman Hossain",
      userPhone: "01712345678",
      trxId: "LN918FX2K",
      amount: 5000,
      dueAmount: 5000,
      dueDate: "08/08/26 at 12:00 PM",
      status: "Unpaid",
      createdAt: "07/08/26 - 10:12 AM",
    },
    {
      id: "LN-902",
      userId: "U1024",
      userName: "Ayesha Siddiqua",
      userPhone: "01822334455",
      trxId: "LN882PL9M",
      amount: 10000,
      dueAmount: 0,
      dueDate: "07/08/26 at 12:00 PM",
      status: "Paid",
      createdAt: "06/08/26 - 09:45 AM",
    },
    {
      id: "LN-903",
      userId: "U1005",
      userName: "Tanvir Ahmed",
      userPhone: "01911223344",
      trxId: "LN771QR3X",
      amount: 2500,
      dueAmount: 2500,
      dueDate: "06/08/26 at 12:00 PM",
      status: "Overdue",
      createdAt: "05/08/26 - 04:20 PM",
    },
    {
      id: "LN-904",
      userId: "U1088",
      userName: "Kazi Nabil",
      userPhone: "01600112233",
      trxId: "LN550BN8K",
      amount: 15000,
      dueAmount: 15000,
      dueDate: "08/08/26 at 12:00 PM",
      status: "Unpaid",
      createdAt: "07/08/26 - 02:10 PM",
    },
    {
      id: "LN-905",
      userId: "U1052",
      userName: "Sabbir Rahman",
      userPhone: "01755443322",
      trxId: "LN441XX99",
      amount: 1000,
      dueAmount: 0,
      dueDate: "05/08/26 at 12:00 PM",
      status: "Paid",
      createdAt: "04/08/26 - 11:00 AM",
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

  // Stat Calculations
  const totalLoanAmount = loans.reduce((acc, curr) => acc + curr.amount, 0);
  const totalBorrowersCount = new Set(loans.map((l) => l.userId)).size;

  const totalDueAmount = loans.reduce((acc, curr) => acc + curr.dueAmount, 0);
  const overdueOrUnpaidLoans = loans.filter((l) => l.dueAmount > 0);
  const dueBorrowersCount = new Set(overdueOrUnpaidLoans.map((l) => l.userId))
    .size;

  // Search Filter
  const filteredLoans = loans.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      item.userName.toLowerCase().includes(query) ||
      item.userId.toLowerCase().includes(query) ||
      item.trxId.toLowerCase().includes(query) ||
      item.userPhone.includes(query)
    );
  });

  return (
    <AdminLayout>
      <div className="pb-12 space-y-3 max-w-4xl mx-auto relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
              <Landmark className="w-4 h-4 text-[#073E7D]" />
              Loan Management
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Monitor micro-loan disbursements and total active dues
            </p>
          </div>
        </div>

        {/* Top Statistics Card Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Side 1: Total Take Loan Stats */}
          <div className="bg-gradient-to-br from-[#073E7D] to-[#052d5b] text-white p-3 rounded-2xl border border-blue-900/20 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                Total Loans Given
              </span>
              <div className="p-1 bg-white/10 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5 text-blue-200" />
              </div>
            </div>
            <h2 className="text-lg font-black">
              TK {totalLoanAmount.toLocaleString()}
            </h2>
            <div className="flex items-center gap-1 text-[10px] text-blue-200 font-semibold">
              <Users className="w-3 h-3" />
              <span>{totalBorrowersCount} Unique Borrowers</span>
            </div>
          </div>

          {/* Side 2: Total Due Loan Stats */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-3 rounded-2xl border border-slate-700 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                Total Active Due
              </span>
              <div className="p-1 bg-rose-500/20 rounded-lg">
                <Wallet className="w-3.5 h-3.5 text-rose-400" />
              </div>
            </div>
            <h2 className="text-lg font-black text-rose-400">
              TK {totalDueAmount.toLocaleString()}
            </h2>
            <div className="flex items-center gap-1 text-[10px] text-slate-300 font-semibold">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{dueBorrowersCount} Borrowers Pending</span>
            </div>
          </div>
        </div>

        {/* Due Loans Link Option Banner (Direct route for future due page) */}
        <Link
          to="/borrowers"
          className="bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between transition shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/15 rounded-xl text-amber-700">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                View Due Loan Borrowers
                <span className="bg-amber-200/70 text-amber-900 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  {dueBorrowersCount} People
                </span>
              </h3>
              <p className="text-[10px] font-medium text-slate-500">
                Inspect borrowers with overdue balances
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
        </Link>

        {/* Pay loan transactions */}
        <Link
          to="/pay-loans-transactions"
          className="bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between transition shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/15 rounded-xl text-amber-700">
              <RiHistoryFill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                Pay Loan Transactions
              </h3>
              <p className="text-[10px] font-medium text-slate-500">
                Click to inspect paid loan transactions
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
        </Link>

        {/* Search Bar */}
        <div className="sticky top-0 left-0 z-10">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by User Name, UID, Phone, or TrxID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#073E7D] transition shadow-sm"
          />
        </div>

        {/* Transaction Cards List */}
        <div className="space-y-2.5">
          {filteredLoans.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-500">
                No matching take loan records found
              </p>
            </div>
          ) : (
            filteredLoans.slice(0, visibleCount).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2.5"
              >
                {/* Header Row: TrxID & Status Badge */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      #{item.trxId}
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

                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border flex items-center gap-1 ${
                      item.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : item.status === "Overdue"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Main Request Grid */}
                <div className="grid grid-cols-11 gap-1 items-center bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs">
                  {/* User Details */}
                  <div className="col-span-5 space-y-0.5">
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

                  {/* Loan Amount */}
                  <div className="col-span-3 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Disbursed
                    </span>
                    <p className="text-xs font-black text-slate-900">
                      TK <br /> {item.amount.toLocaleString()}
                    </p>
                  </div>

                  {/* Remaining Due */}
                  <div className="col-span-3 text-right space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Remaining Due
                    </span>
                    <p
                      className={`text-xs font-black ${
                        item.dueAmount > 0
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      TK <br />
                      {item.dueAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Footer Timestamps */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                  <span className="font-medium">Taken: {item.createdAt}</span>
                  <span className="font-semibold text-slate-600">
                    Due: {item.dueDate}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* See More Button */}
          {filteredLoans.length > visibleCount && (
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
