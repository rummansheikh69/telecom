import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  ArrowLeft,
  Share2,
  Eye,
  EyeOff,
  CheckCircle2,
  User,
  Copy,
  Check,
  Wallet,
  Smartphone,
  Landmark,
} from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";

export default function WithdrawalFlow() {
  // Navigation State: 1 = Amount, 2 = Choose Method, 3 = Wallet Details & PIN, 4 = Success
  const [step, setStep] = useState(1);

  // App Mock Global State
  const availableBalance = 4500.0;
  const currentUserId = "U1013";
  const mockTxId = "WTH918FX2K";

  // Form States
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [walletNumber, setWalletNumber] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showNewBalance, setShowNewBalance] = useState(true);
  const [copiedTxId, setCopiedTxId] = useState(false);

  const withdrawalMethods = [
    { name: "Bkash", image: "images/bkash.svg" },
    { name: "Nagad", image: "images/nagad.png" },
    { name: "Rocket", image: "images/rocket.webp" },
    { name: "Binance", image: "images/binance.svg" },
  ];

  // Absolute Mobile Cross-Platform Copy Engine
  const copyTransactionId = () => {
    const textToCopy = mockTxId;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => triggerCopySuccess())
        .catch(() => fallbackCopyText(textToCopy));
    } else {
      fallbackCopyText(textToCopy);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      triggerCopySuccess();
    } catch (err) {
      console.error("Fallback execution copy failed", err);
    }
    document.body.removeChild(textArea);
  };

  const triggerCopySuccess = () => {
    setCopiedTxId(true);
    setTimeout(() => setCopiedTxId(false), 2000);
  };

  // Dynamic Web Share configuration
  const handleShare = async () => {
    const shareText = `Withdrawal Request Successful!\nAmount: TK: ${parseFloat(amount).toFixed(2)}\nMethod: ${selectedMethod}\nAccount: ${walletNumber}\nTransaction ID: ${mockTxId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Withdrawal Receipt",
          text: shareText,
        });
      } catch (err) {
        console.log("Sharing failed:", err);
      }
    } else {
      alert(shareText);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAmount("");
    setSelectedMethod("");
    setWalletNumber("");
    setPin("");
  };

  return (
    <div className=" flex flex-col min-h-screen bg-main p-4 font-sans pb-16">
      {/* Mobile Frame Container Wrapper */}
      <div className="w-full max-w-md h-[844px] bg-subMain flex-1 shadow-2xl rounded-[32px] overflow-hidden flex flex-col relative border border-gray-200">
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
              {step === 1 && "Withdraw Money"}
              {step === 2 && "Select Method"}
              {step === 3 && "Account Details"}
            </h1>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* ========================================================= */}
          {/* STEP 1: AMOUNT SPECIFICATION                              */}
          {/* ========================================================= */}
          {step === 1 && (
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm space-y-6">
                <div className="w-12 h-12 bg-blue-50 text-[#073E7D] rounded-xl flex items-center justify-center mx-auto">
                  <Wallet className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-400">
                    Available Balance
                  </h3>
                  <p className="text-2xl font-black text-slate-800 mt-1">
                    TK: {availableBalance.toFixed(2)}
                  </p>
                </div>

                <style>{`
                  input::-webkit-outer-spin-button,
                  input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                  }
                  input[type=number] {
                    -moz-appearance: textfield;
                  }
                `}</style>

                <div className="relative max-w-xs mx-auto">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-center text-3xl font-bold py-3 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition text-slate-800"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    TK
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Minimum withdrawal limit: TK 10
                </p>
              </div>

              <div>
                {amount && parseFloat(amount) > availableBalance && (
                  <p className="text-red-500 text-xs font-semibold text-center mb-3">
                    ❌ Insufficient funds available
                  </p>
                )}
                {amount && parseFloat(amount) < 10 && (
                  <p className="text-amber-600 text-xs font-semibold text-center mb-3">
                    ⚠️ Minimum withdrawal amount is TK 10
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={
                    !amount ||
                    parseFloat(amount) < 10 ||
                    parseFloat(amount) > availableBalance
                  }
                  className="w-full py-4 bg-[#073E7D] text-white font-bold text-base rounded-xl shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: WITHDRAWAL GATEWAY SELECTION                      */}
          {/* ========================================================= */}
          {step === 2 && (
            <div className="p-4 flex flex-col gap-3 flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1 mb-1">
                Select Gateway
              </p>

              {withdrawalMethods.map((method, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(method.name);
                    setStep(3);
                  }}
                  className="w-full bg-white border border-slate-100 hover:border-blue-200 p-4 rounded-xl flex items-center justify-between shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={method.image}
                        alt={method.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {method.name} Transfer
                    </span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                </button>
              ))}
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 3: WALLET DETAILS CONFIG & PIN VALIDATION             */}
          {/* ========================================================= */}
          {step === 3 && (
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center text-xs text-slate-600 font-bold">
                  <span>Selected Option:</span>
                  <span className="bg-blue-50 text-[#073E7D] px-3 py-1 rounded-full">
                    {selectedMethod}
                  </span>
                </div>

                {/* Conditional Field Labeling */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {selectedMethod === "Binance"
                      ? "Binance Account ID"
                      : `${selectedMethod} Wallet Number`}
                  </label>
                  <input
                    type={selectedMethod === "Binance" ? "text" : "tel"}
                    placeholder={
                      selectedMethod === "Binance"
                        ? "Enter Binance ID"
                        : "01XXXXXXXXX"
                    }
                    value={walletNumber}
                    onChange={(e) => setWalletNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Security PIN Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Enter Security Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPin ? "text" : "password"}
                      placeholder="••••"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-center tracking-widest text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPin ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                disabled={!walletNumber.trim() || !pin.trim()}
                onClick={() => setStep(4)}
                className="w-full bg-secondary text-white font-bold py-4 rounded-xl shadow-lg  disabled:bg-gray-300 transition"
              >
                Confirm & Withdraw
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 4: SUCCESS RECEIPT BOARD (P2P Matched Blueprint)      */}
          {/* ========================================================= */}
          {step === 4 && (
            <div className="bg-white flex flex-col flex-1 animate-fadeIn">
              <div className="flex flex-col items-center pt-8 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100 mb-1 text-[#073E7D]">
                  <Landmark className="w-8 h-8" />
                </div>
                <h2 className="text-xl px-10 text-center font-extrabold text-gray-700">
                  Withdrawal Request successful
                </h2>
              </div>

              {/* Data Table Grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 border-b border-gray-100">
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-400">Time</p>
                  <p className="text-xs font-bold text-gray-700 mt-1">
                    10:12am 17/04/26
                  </p>
                </div>

                <div className="p-4 flex flex-col justify-between">
                  <p className="text-xs font-semibold text-gray-400">
                    Transaction ID
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono font-bold text-gray-700">
                      {mockTxId}
                    </span>
                    <button
                      onClick={copyTransactionId}
                      className="p-1 rounded-md hover:bg-gray-100 transition active:scale-90"
                    >
                      {copiedTxId ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-pink-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-400">
                    Total Amount
                  </p>
                  <p className="text-sm font-black text-gray-800 mt-1">
                    TK: {parseFloat(amount).toFixed(2)}
                  </p>
                </div>

                <div className="p-4 relative">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-gray-400">
                      New Balance
                    </p>
                    <button
                      onClick={() => setShowNewBalance(!showNewBalance)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      {showNewBalance ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-black text-gray-800 mt-1">
                    {showNewBalance
                      ? `TK: ${(availableBalance - parseFloat(amount)).toFixed(2)}`
                      : "••••••"}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-400">
                    Account Type
                  </p>
                  <p className="text-xs font-bold text-gray-700 mt-1">
                    {selectedMethod}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-400">
                    Number/ID.
                  </p>
                  <p className="text-xs font-mono font-bold text-gray-700 mt-1 truncate">
                    {walletNumber}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-around items-center p-6 bg-gray-50">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-[#073E7D] font-bold text-xl hover:scale-105 transition transform"
                >
                  <Share2 className="w-6 h-6 fill-current" />
                  <span>Share</span>
                </button>
              </div>

              {/* Bottom Action Home Trigger */}
              <button
                onClick={handleReset}
                className="w-full bg-secondary text-white font-bold py-4 text-center tracking-wide text-lg flex items-center justify-center gap-2"
              >
                <span>
                  <IoIosArrowBack />
                </span>{" "}
                Back To Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
