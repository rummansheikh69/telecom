import React, { useState } from "react";
import {
  Landmark,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
} from "lucide-react";
import PageTitle from "../components/layout/PageTitle";

export default function TakeLoanPage() {
  const [step, setStep] = useState(1); // 1: Limit & Input, 2: Success
  const [amount, setAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
  const [error, setError] = useState("");

  // Account Loan Rules State
  const [maxLoanLimit] = useState(15000); // Original credit limit
  const [activeLoan, setActiveLoan] = useState(0); // Current active loan taken
  const minLoan = 500;

  // Derived Values
  const availableLimit = maxLoanLimit - activeLoan;
  const parsedAmount = parseFloat(amount) || 0;

  // Preset Amount Buttons
  const quickAmounts = [1000, 2500, 5000, 10000];

  // Format explicitly as DD/MM/YY at 12:00 PM
  const getFormattedNextDay12PM = () => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const day = String(nextDay.getDate()).padStart(2, "0");
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const year = String(nextDay.getFullYear()).slice(-2);
    return `${day}/${month}/${year} at 12:00 PM`;
  };

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

    if (numericVal > availableLimit) {
      setError(
        `Amount exceeds your available limit of TK ${availableLimit.toLocaleString()}`,
      );
    } else if (numericVal < minLoan && val !== "") {
      setError(`Minimum loan amount is TK ${minLoan}`);
    } else {
      setError("");
    }
  };

  // Block minus key input explicitly
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const handleSubmitLoan = (e) => {
    e.preventDefault();
    if (!parsedAmount || parsedAmount < minLoan) {
      setError(`Please enter an amount of at least TK ${minLoan}`);
      return;
    }
    if (parsedAmount > availableLimit) {
      setError(`Available loan limit is TK ${availableLimit.toLocaleString()}`);
      return;
    }

    // Process Loan
    setActiveLoan((prev) => prev + parsedAmount);
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
    <div className="bg-main min-h-screen pb-14 flex flex-col justify-between font-sans max-w-md mx-auto relative overflow-hidden">
      <PageTitle link={"/wallet"} title={"Take Loan"} />

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

      {/* ----------------- STEP 1: LOAN INPUT & OVERVIEW ----------------- */}
      {step === 1 && (
        <div className="flex-1 flex flex-col justify-between p-4 space-y-4">
          <div className="space-y-4">
            {/* Header Title */}
            <div className="flex items-center justify-between pb-1">
              <div>
                <h1 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                  <Landmark className="w-5 h-5 text-[#073E7D]" />
                  Instant Micro-Loan
                </h1>
                <p className="text-[11px] font-semibold text-slate-500">
                  Instant disbursement to your main balance
                </p>
              </div>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />{" "}
                Pre-Approved
              </span>
            </div>

            {/* Loan Limit Card */}
            <div className="bg-gradient-to-br from-[#073E7D] via-[#052d5b] to-slate-900 rounded-2xl p-4 text-white shadow-lg shadow-blue-900/15 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />

              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Available Loan Limit
                  </span>
                  <h2 className="text-2xl font-black text-white mt-0.5">
                    TK {availableLimit.toLocaleString()}
                  </h2>
                </div>
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              {/* Status Bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-semibold text-slate-300">
                  <span>Credit Eligibility</span>
                  <span className="text-emerald-400 font-bold">
                    {/* Show 100% when no loan taken, else show TK amount */}
                    {activeLoan === 0
                      ? "100%"
                      : `TK ${availableLimit.toLocaleString()} / TK ${maxLoanLimit.toLocaleString()}`}
                  </span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(availableLimit / maxLoanLimit) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form Input Container */}
            <form
              onSubmit={handleSubmitLoan}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4"
            >
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Enter Desired Loan Amount
                  </label>
                  <span className="text-[10px] font-bold text-slate-400">
                    Min: TK {minLoan}
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
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                  Quick Select
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      disabled={val > availableLimit}
                      onClick={() => handleSelectQuickAmount(val)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        selectedQuickAmount === val
                          ? "bg-[#073E7D] text-white border-[#073E7D] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 disabled:opacity-40"
                      }`}
                    >
                      {val >= 1000 ? `${val / 1000}k` : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Details */}
              {parsedAmount > 0 && !error && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between text-slate-600 font-semibold">
                    <span>Requested Loan:</span>
                    <span className="font-bold text-slate-900">
                      TK {parsedAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-semibold">
                    <span>Processing Fee:</span>
                    <span className="font-bold text-emerald-600">
                      FREE (TK 0.00)
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1.5 text-xs font-extrabold">
                    <span className="text-slate-800">
                      Total Due on Repayment:
                    </span>
                    <span className="text-[#073E7D]">
                      TK {parsedAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </form>

            {/* Note Box */}
            <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="font-medium">
                Loan must be repaid by{" "}
                <strong>{getFormattedNextDay12PM()}</strong>. Auto-deduction
                applies if balance is available on due time. Otherwise your
                account will be temporarily frozen until repayment is made.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleSubmitLoan}
            disabled={!parsedAmount || !!error}
            className="w-full py-3.5 bg-[#073E7D] disabled:bg-slate-300 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-950/10 active:scale-[0.99] transition flex items-center justify-center gap-2"
          >
            <span>Confirm & Receive Loan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
                Disbursement Complete
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-2">
                Loan Granted Successfully!
              </h2>
              <p className="text-xs text-slate-500 font-medium px-4 mt-1">
                TK {parsedAmount.toLocaleString()} has been added directly to
                your main wallet balance.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-left space-y-3 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Transaction Ref
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  LN-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">
                    Approved Amount:
                  </span>
                  <span className="font-black text-slate-800">
                    TK {parsedAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">
                    Processing Fee:
                  </span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">
                    Repayment Due Date:
                  </span>
                  <span className="font-bold text-amber-700">
                    {getFormattedNextDay12PM()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-xs font-extrabold">
                  <span className="text-slate-800">Total Payable:</span>
                  <span className="text-[#073E7D]">
                    TK {parsedAmount.toFixed(2)}
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
