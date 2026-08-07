import React, { useState } from "react";
import {
  Users,
  Search,
  AlertTriangle,
  Snowflake,
  Copy,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";

export default function AdminLoanDues() {
  // Mock Borrowers With Due Loans State
  const [borrowers] = useState([
    {
      id: "DUE-101",
      userId: "U1013",
      userName: "Rumman Hossain",
      trxId: "LN918FX2K",
      amountTaken: 5000,
      remainingDue: 5000,
      takeLoanDate: "07/08/26 - 10:12 AM",
      dueDate: "08/08/26 at 12:00 PM",
      status: "Active", // Active | Overdue | Frozen (Updated by cron job)
    },
    {
      id: "DUE-102",
      userId: "U1005",
      userName: "Tanvir Ahmed",
      trxId: "LN771QR3X",
      amountTaken: 2500,
      remainingDue: 2500,
      takeLoanDate: "05/08/26 - 04:20 PM",
      dueDate: "06/08/26 at 12:00 PM",
      status: "Frozen", // Cron job froze this user
    },
    {
      id: "DUE-103",
      userId: "U1088",
      userName: "Kazi Nabil",
      trxId: "LN550BN8K",
      amountTaken: 15000,
      remainingDue: 15000,
      takeLoanDate: "07/08/26 - 02:10 PM",
      dueDate: "08/08/26 at 12:00 PM",
      status: "Frozen",
    },
    {
      id: "DUE-104",
      userId: "U1042",
      userName: "Mehedi Hasan",
      trxId: "LN332XY8P",
      amountTaken: 3000,
      remainingDue: 1500,
      takeLoanDate: "04/08/26 - 01:00 PM",
      dueDate: "05/08/26 at 12:00 PM",
      status: "Overdue",
    },
    {
      id: "DUE-105",
      userId: "U1075",
      userName: "Nusrat Jahan",
      trxId: "LN110PP2Q",
      amountTaken: 7500,
      remainingDue: 7500,
      takeLoanDate: "06/08/26 - 11:15 AM",
      dueDate: "09/08/26 at 12:00 PM",
      status: "Active",
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
  const totalDueBorrowers = borrowers.length;
  const totalDueAmountSum = borrowers.reduce(
    (acc, curr) => acc + curr.remainingDue,
    0,
  );
  const frozenCount = borrowers.filter((b) => b.status === "Frozen").length;

  // Search Filter
  const filteredBorrowers = borrowers.filter((item) => {
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
              <Users className="w-4 h-4 text-[#073E7D]" />
              Loan Due Borrowers
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Overview of all borrowers with active micro-loan dues
            </p>
          </div>
        </div>

        {/* Top Statistics Overview Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Side 1: Total Due Count & Sum */}
          <div className="bg-gradient-to-br from-rose-900 to-slate-900 text-white p-3 rounded-2xl border border-rose-900/20 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                Total Due
              </span>
              <div className="p-1 bg-rose-500/20 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              </div>
            </div>
            <h2 className="text-lg font-black text-rose-400">
              TK {totalDueAmountSum.toLocaleString()}
            </h2>
            <div className="flex items-center gap-1 text-[10px] text-slate-300 font-semibold">
              <Users className="w-3 h-3 text-amber-400" />
              <span>{totalDueBorrowers} Borrowers Active</span>
            </div>
          </div>

          {/* Side 2: Frozen Accounts Count */}
          <div className="bg-gradient-to-br from-slate-900 to-[#073E7D] text-white p-3 rounded-2xl border border-slate-700 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                Frozen Accounts
              </span>
              <div className="p-1 bg-blue-500/20 rounded-lg">
                <Snowflake className="w-3.5 h-3.5 text-blue-300" />
              </div>
            </div>
            <h2 className="text-lg font-black text-blue-300">
              {frozenCount} Borrowers
            </h2>
            <div className="flex items-center gap-1 text-[10px] text-blue-200 font-semibold">
              <span>Auto-frozen daily</span>
            </div>
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
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#073E7D] transition shadow-sm"
          />
        </div>

        {/* Borrower Cards List */}
        <div className="space-y-2.5">
          {filteredBorrowers.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-500">
                No matching due borrowers found
              </p>
            </div>
          ) : (
            filteredBorrowers.slice(0, visibleCount).map((borrower) => (
              <div
                key={borrower.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2.5"
              >
                {/* Header Row: TrxID & Copy */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      #{borrower.trxId}
                    </span>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(borrower.trxId)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      {copiedTxId === borrower.trxId ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Main Borrower Info Grid */}
                <div className="grid grid-cols-12 gap-1 items-center bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs">
                  {/* Borrower Name & UID directly below it */}
                  <div className="col-span-5 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Borrower
                    </span>
                    <h4 className="font-bold text-slate-800 truncate">
                      {borrower.userName}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#073E7D]">
                      UID: {borrower.userId}
                    </p>
                  </div>

                  {/* Account Status Section */}
                  <div className="col-span-3 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Account
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${
                        borrower.status === "Frozen"
                          ? "bg-slate-200 text-slate-800 border-slate-300"
                          : borrower.status === "Overdue"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {borrower.status === "Frozen" && (
                        <Snowflake className="w-2.5 h-2.5 text-slate-700" />
                      )}
                      {borrower.status === "Overdue" && (
                        <AlertCircle className="w-2.5 h-2.5" />
                      )}
                      {borrower.status === "Active" && (
                        <Clock className="w-2.5 h-2.5" />
                      )}
                      {borrower.status}
                    </span>
                  </div>

                  {/* Remaining Due */}
                  <div className="col-span-4 text-right space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Current Due
                    </span>
                    <p className="text-xs font-black text-rose-600">
                      TK {borrower.remainingDue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Clean Date Footer */}
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                  <span className="font-medium">
                    Taken: {borrower.takeLoanDate}
                  </span>
                  <span className="font-semibold text-slate-600">
                    Due: {borrower.dueDate}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* See More Button */}
          {filteredBorrowers.length > visibleCount && (
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
