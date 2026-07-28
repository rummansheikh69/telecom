import React, { useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Eye,
  EyeOff,
  MessageSquare,
  Flame,
} from "lucide-react";

export default function TopupScreen() {
  // Navigation State: 1 = Number, 2 = Operator & Notes, 3 = Amount & Password, 4 = Success Receipt
  const [step, setStep] = useState(1);

  // App Mock Global Data
  const availableBalance = 3250.0;
  const mockTxId = "TOP772910X2";

  // Form States
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOperator, setSelectedOperator] = useState(null); // Stores the whole operator object now
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copiedTxId, setCopiedTxId] = useState(false);

  // Operator Dataset with local image assets or CDN links
  const operators = [
    {
      name: "Grameenphone",
      code: "GP",
      logo: "https://placehold.co/100x100/00a4e4/white?text=GP", // Replace with your local asset path: e.g., "/assets/gp.png"
      color: "border-blue-200 text-blue-600 bg-blue-50/40",
    },
    {
      name: "Robi",
      code: "Robi",
      logo: "https://placehold.co/100x100/e31837/white?text=Robi", // Replace with: e.g., "/assets/robi.png"
      color: "border-red-200 text-red-600 bg-red-50/40",
    },
    {
      name: "Banglalink",
      code: "BL",
      logo: "https://placehold.co/100x100/ff6600/white?text=BL", // Replace with: e.g., "/assets/bl.png"
      color: "border-orange-200 text-orange-600 bg-orange-50/40",
    },
    {
      name: "Airtel",
      code: "Airtel",
      logo: "https://placehold.co/100x100/ff0000/white?text=Airtel", // Replace with: e.g., "/assets/airtel.png"
      color: "border-rose-200 text-rose-600 bg-rose-50/40",
    },
    {
      name: "Teletalk",
      code: "Teletalk",
      logo: "https://placehold.co/100x100/5cb85c/white?text=TT", // Replace with: e.g., "/assets/teletalk.png"
      color: "border-emerald-200 text-emerald-600 bg-emerald-50/40",
    },
  ];

  const handleCopyTxId = () => {
    navigator.clipboard.writeText(mockTxId);
    setCopiedTxId(true);
    setTimeout(() => setCopiedTxId(false), 2000);
  };

  const handleShareReceipt = async () => {
    const shareText = `Topup Request Successful!\nNumber: ${phoneNumber}\nOperator: ${selectedOperator?.name}\nAmount: TK ${parseFloat(amount).toFixed(2)}\nTrxID: ${mockTxId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Topup Receipt", text: shareText });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert(shareText);
    }
  };

  const handleReset = () => {
    setStep(1);
    setPhoneNumber("");
    setSelectedOperator(null);
    setNotes("");
    setAmount("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-main p-4 font-sans pb-16 flex flex-col">
      {/* Mobile Shell Container */}
      <div className="w-full max-w-md flex-1 bg-[#f4f6f9] shadow-2xl rounded-[32px] overflow-hidden flex flex-col relative border border-gray-200">
        {/* TOP HEADER NAVIGATION BAR */}
        {step < 4 && (
          <div className="bg-[#073E7D] text-white px-4 pt-6 pb-4 flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="hover:bg-blue-900 p-1 rounded-full transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-semibold tracking-wide flex-1">
              {step === 1 && "Mobile Topup"}
              {step === 2 && "Choose Operator"}
              {step === 3 && "Secure Checkout"}
            </h1>
          </div>
        )}

        {/* ONBOARDING SLIDES INTERACTION LAYER */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* ========================================================= */}
          {/* STEP 1: PHONE NUMBER INPUT ONBOARDING                     */}
          {/* ========================================================= */}
          {step === 1 && (
            <div className="p-5 flex flex-col justify-between flex-1 ">
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Target Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <Smartphone className="absolute left-4 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-base font-bold text-slate-800 focus:outline-none focus:border-blue-500 tracking-wide"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Enter a valid 11-digit mobile operator routing address link.
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={phoneNumber.length < 11}
                onClick={() => setStep(2)}
                className="w-full py-4 bg-[#073E7D] text-white font-bold rounded-xl shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Next Step
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: OPERATOR SELECTION (WITH LOGO IMAGES) & NOTES     */}
          {/* ========================================================= */}
          {step === 2 && (
            <div className="p-5 flex flex-col justify-between flex-1">
              <div className="space-y-4">
                {/* Operator Selector Grid */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Select Operator Network
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {operators.map((op) => {
                      const isSelected = selectedOperator?.name === op.name;
                      return (
                        <button
                          key={op.name}
                          type="button"
                          onClick={() => setSelectedOperator(op)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all relative ${
                            isSelected
                              ? "border-[#073E7D] bg-blue-50/40 ring-2 ring-[#073E7D]/10"
                              : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"
                          }`}
                        >
                          {/* Image Shield Wrapper */}
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shadow-inner">
                            {op.logo ? (
                              <img
                                src={op.logo}
                                alt={op.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-black">
                                {op.code}
                              </span>
                            )}
                          </div>

                          <span
                            className={`text-[10px] font-bold mt-2 text-center truncate w-full ${
                              isSelected ? "text-[#073E7D]" : "text-slate-500"
                            }`}
                          >
                            {op.name}
                          </span>

                          {/* Minimal selection marker pin */}
                          {isSelected && (
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#073E7D]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Fixed Height Text Area Block */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> Additional Notes
                    (Optional)
                  </label>
                  <textarea
                    placeholder="Write instructions or info regarding the package recharge context..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-24 max-h-24 min-h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500 resize-none text-slate-700 leading-relaxed"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={!selectedOperator}
                onClick={() => setStep(3)}
                className="w-full py-4 bg-[#073E7D] text-white font-bold rounded-xl shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Next Step
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 3: AMOUNT & PASSWORD VERIFICATION SECTION            */}
          {/* ========================================================= */}
          {step === 3 && (
            <div className="p-5 flex flex-col justify-between flex-1">
              <div className="space-y-4">
                {/* Available Wallet Header Grid */}
                <div className="bg-[#073E7D] text-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                  <span className="text-xs font-medium text-blue-100">
                    Wallet Available Balance
                  </span>
                  <span className="text-base font-black">
                    TK {availableBalance.toFixed(2)}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  {/* Amount Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Topup Amount (TK)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xl font-extrabold text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Password Input Block */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Enter Security Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-base font-bold tracking-wider text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {amount && parseFloat(amount) > availableBalance && (
                  <p className="text-red-500 text-xs font-semibold text-center mb-3">
                    ❌ Total amount exceeds balance limitation
                  </p>
                )}
                <button
                  type="button"
                  disabled={
                    !amount ||
                    !password.trim() ||
                    parseFloat(amount) > availableBalance
                  }
                  onClick={() => setStep(4)}
                  className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-md disabled:bg-gray-300 transition hover:bg-green-700"
                >
                  Confirm & Process
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 4: SUCCESS RECEIPT SCREEN                            */}
          {/* ========================================================= */}
          {step === 4 && (
            <div className="bg-white flex flex-col flex-1 animate-fadeIn">
              <div className="flex flex-col items-center pt-8 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-green-600 font-bold text-base mb-3">
                  <CheckCircle2 className="w-6 h-6 fill-green-50" />
                  <span>Topup Request Completed</span>
                </div>
                {/* Success Screen Operator Image Display */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center p-1 shadow-sm mb-2">
                  <img
                    src={selectedOperator?.logo}
                    alt="operator logo"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h2 className="text-xl font-black text-slate-800">
                  {selectedOperator?.name}
                </h2>
              </div>

              {/* Grid-based Breakdown Table Receipt Data */}
              <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 border-b border-slate-100">
                <div className="p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Target Mobile
                  </p>
                  <p className="text-xs font-black text-slate-700 mt-1 tracking-wide">
                    {phoneNumber}
                  </p>
                </div>

                <div className="p-4 flex flex-col justify-between">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Transaction Reference
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {mockTxId}
                    </span>
                    <button
                      onClick={handleCopyTxId}
                      className="p-1 rounded bg-slate-50 border text-slate-500"
                    >
                      {copiedTxId ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Amount Paid
                  </p>
                  <p className="text-sm font-black text-slate-800 mt-0.5">
                    TK {parseFloat(amount).toFixed(2)}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Remaining Balance
                  </p>
                  <p className="text-sm font-black text-slate-800 mt-0.5">
                    TK {(availableBalance - parseFloat(amount)).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Notes display rendering panel if specified */}
              {notes.trim() && (
                <div className="p-4 bg-slate-50 border-b border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                    Attached Notes Statement
                  </p>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-inner">
                    {notes}
                  </p>
                </div>
              )}

              {/* Footer Share Action Controls */}
              <div className="flex-1 flex flex-col justify-center items-center bg-slate-50/50 p-6 min-h-[140px]">
                <button
                  onClick={handleShareReceipt}
                  className="flex items-center gap-2 text-[#073E7D] font-bold text-lg hover:scale-105 transition transform"
                >
                  <Share2 className="w-5 h-5 fill-current" />
                  <span>Share Receipt</span>
                </button>
              </div>

              {/* Return Anchor Button */}
              <button
                onClick={handleReset}
                className="w-full bg-[#073E7D] hover:bg-blue-900 text-white font-bold py-4 text-center text-base transition tracking-wide"
              >
                Back To Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
