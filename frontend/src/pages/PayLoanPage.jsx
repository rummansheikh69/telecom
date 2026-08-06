import React, { useState } from "react";
import {
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  History,
  ChevronRight,
  Receipt,
  Zap,
} from "lucide-react";
import PageTitle from "../components/layout/PageTitle";
import { Link } from "react-router-dom";

export default function PayLoanPage() {
  const [step, setStep] = useState(1); // 1: Input & History, 2: Success
  const [amount, setAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
  const [error, setError] = useState("");

  // Account State (Mock Data)
  const userBalance = 8500; // User's main wallet balance
  const activeLoanDue = 4500; // Total active loan due
  const minRepayment = 100;

  const parsedAmount = parseFloat(amount) || 0;

  // Preset Amount Buttons based on due amount
  const quickAmounts = [500, 1000, 2500, activeLoanDue];

  // Recent 4 Loan History Items
  const [recentHistory] = useState([
    {
      id: 1,
      trxId: "LN-849201",
      type: "Repayment",
      amount: 1500,
      date: "06/08/26 - 02:15 PM",
      status: "Successful",
    },
    {
      id: 2,
      trxId: "LN-710392",
      type: "Loan Taken",
      amount: 6000,
      date: "05/08/26 - 11:30 AM",
      status: "Disbursed",
    },
    {
      id: 3,
      trxId: "LN-529104",
      type: "Repayment",
      amount: 2000,
      date: "01/08/26 - 06:45 PM",
      status: "Successful",
    },
    {
      id: 4,
      trxId: "LN-410982",
      type: "Loan Taken",
      amount: 2000,
      date: "30/07/26 - 10:10 AM",
      status: "Disbursed",
    },
  ]);

  const handleSelectQuickAmount = (val) => {
    setSelectedQuickAmount(val);
    setAmount(val.toString());
    setError("");
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;

    // Prevent negative numbers or minus signs
    if (val.includes("-")) return;

    setAmount(val);
    setSelectedQuickAmount(null);

    const numericVal = parseFloat(val);

    if (numericVal > userBalance) {
      setError(
        `Insufficient balance. Your available balance is TK ${userBalance.toLocaleString()}`,
      );
    } else if (numericVal > activeLoanDue) {
      setError(
        `Amount cannot exceed total due of TK ${activeLoanDue.toLocaleString()}`,
      );
    } else if (numericVal < minRepayment && val !== "") {
      setError(`Minimum payment amount is TK ${minRepayment}`);
    } else {
      setError("");
    }
  };

  // Block minus and exponent key inputs
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const handleSubmitRepayment = (e) => {
    e.preventDefault();
    if (!parsedAmount || parsedAmount < minRepayment) {
      setError(`Please enter an amount of at least TK ${minRepayment}`);
      return;
    }
    if (parsedAmount > userBalance) {
      setError(
        `Insufficient balance. Your available balance is TK ${userBalance.toLocaleString()}`,
      );
      return;
    }
    if (parsedAmount > activeLoanDue) {
      setError(
        `Amount cannot exceed total due of TK ${activeLoanDue.toLocaleString()}`,
      );
      return;
    }

    // Process Repayment
    setError("");
    setStep(2);
  };

  const handleReset = () => {
    setAmount("");
    setSelectedQuickAmount(null);
    setError("");
    setStep(1);
  };

  return (
    <div className="bg-main pb-12 min-h-screen flex flex-col justify-between font-sans max-w-md mx-auto relative overflow-hidden">
      <PageTitle link={"/wallet"} title={"Pay Loan"} />

      {/* Inline styles to hide WebKit & Firefox number input spinners */}
      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* ----------------- STEP 1: PAYMENT INPUT & HISTORY ----------------- */}
      {step === 1 && (
        <div className="flex-1 flex flex-col justify-between p-4 space-y-4 pb-6">
          <div className="space-y-4">
            {/* Header Title */}
            <div className="flex items-center justify-between pb-1">
              <div>
                <h1 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                  <Receipt className="w-5 h-5 text-[#073E7D]" />
                  Repay Loan
                </h1>
                <p className="text-[11px] font-semibold text-slate-500">
                  Pay off your outstanding loan balance
                </p>
              </div>
              <span className="bg-blue-50 border border-blue-200 text-[#073E7D] text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#073E7D] fill-[#073E7D]" />{" "}
                Instant Clearance
              </span>
            </div>

            {/* Balances Grid Card */}
            <div className="bg-gradient-to-br from-[#073E7D] via-[#052d5b] to-slate-900 rounded-2xl p-4 text-white shadow-lg shadow-blue-900/15 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />

              <div className="grid grid-cols-2 gap-3 divide-x divide-white/10">
                {/* Active Loan Due */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">
                    Total Loan Due
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">
                    TK {activeLoanDue.toLocaleString()}
                  </h2>
                </div>

                {/* Available Main Balance */}
                <div className="pl-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
                    Available Balance
                  </span>
                  <h2 className="text-xl font-black text-emerald-400 mt-0.5">
                    TK {userBalance.toLocaleString()}
                  </h2>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-2.5 mt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-semibold text-slate-300">
                <span>Repayment Status</span>
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Due Soon
                </span>
              </div>
            </div>

            {/* Form Input Container */}
            <form
              onSubmit={handleSubmitRepayment}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4"
            >
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Enter Repayment Amount
                  </label>
                  <span className="text-[10px] font-bold text-slate-400">
                    Min: TK {minRepayment}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-slate-400 text-sm">
                    TK
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={handleAmountChange}
                    onKeyDown={handleKeyDown}
                    placeholder="0.00"
                    className={`w-full bg-slate-50 border ${
                      error
                        ? "border-rose-500 focus:ring-rose-200"
                        : "border-slate-200 focus:border-[#073E7D]"
                    } rounded-xl pl-10 pr-4 py-3 text-base font-black text-slate-900 focus:outline-none transition`}
                  />
                </div>

                {error && (
                  <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {error}
                  </p>
                )}
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Quick Select
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      disabled={val > activeLoanDue || val > userBalance}
                      onClick={() => handleSelectQuickAmount(val)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        selectedQuickAmount === val
                          ? "bg-[#073E7D] text-white border-[#073E7D] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 disabled:opacity-40"
                      }`}
                    >
                      {val === activeLoanDue ? "Full Due" : `TK ${val}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Details */}
              {parsedAmount > 0 && !error && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between text-slate-600 font-semibold">
                    <span>Payment Amount:</span>
                    <span className="font-bold text-slate-900">
                      TK {parsedAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-semibold">
                    <span>Remaining Due After Payment:</span>
                    <span className="font-bold text-rose-600">
                      TK {Math.max(0, activeLoanDue - parsedAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5 text-xs font-extrabold">
                    <span className="text-slate-800">
                      Remaining Available Balance:
                    </span>
                    <span className="text-emerald-700">
                      TK {(userBalance - parsedAmount).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Repay Action Button */}
              <button
                type="submit"
                disabled={!parsedAmount || !!error}
                className="w-full py-3.5 bg-[#073E7D] disabled:bg-slate-300 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-950/10 active:scale-[0.99] transition flex items-center justify-center gap-2"
              >
                <span>Confirm Repayment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Recent 4 Loan History Section */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-[#073E7D]" />
                  Recent Loan Activity
                </h3>
                <Link
                  to="/loan-history"
                  className="text-[10px] font-bold text-slate-400 underline"
                >
                  View All
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
                {recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-800 text-[11px]">
                          {item.trxId}
                        </span>
                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                            item.type === "Repayment"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-blue-50 text-[#073E7D] border border-blue-200"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        {item.date}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-black text-xs ${
                          item.type === "Repayment"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {item.type === "Repayment" ? "-" : "+"}TK{" "}
                        {item.amount.toLocaleString()}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400">
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- STEP 2: SUCCESS VIEW ----------------- */}
      {step === 2 && (
        <div className="flex-1 flex flex-col justify-between p-4 my-auto space-y-6 text-center">
          {/* Main Success Container */}
          <div className="space-y-4 pt-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50 shadow-inner">
              <CheckCircle2 className="w-9 h-9 text-emerald-600" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                Payment Received
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-2">
                Repayment Successful!
              </h2>
              <p className="text-xs text-slate-500 font-medium px-4 mt-1">
                TK {parsedAmount.toLocaleString()} has been paid towards your
                outstanding loan.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-left space-y-3 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Transaction Ref
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  PY-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">
                    Amount Paid:
                  </span>
                  <span className="font-black text-emerald-600">
                    TK {parsedAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">
                    Remaining Loan Due:
                  </span>
                  <span className="font-bold text-slate-800">
                    TK {Math.max(0, activeLoanDue - parsedAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-xs font-extrabold">
                  <span className="text-slate-800">New Available Balance:</span>
                  <span className="text-[#073E7D]">
                    TK {(userBalance - parsedAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3.5 bg-[#073E7D] text-white font-extrabold text-sm rounded-xl shadow-md active:scale-[0.99] transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
