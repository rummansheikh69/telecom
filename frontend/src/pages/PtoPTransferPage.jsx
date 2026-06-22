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
} from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";

export default function P2PTransferFlow() {
  // Navigation State: 1 = Search, 2 = Amount & Ref, 3 = Summary & PIN, 4 = Success
  const [step, setStep] = useState(1);

  // App Mock Global State
  const availableBalance = 1000.0;
  const currentUserId = "U1013";
  const mockTxId = "DDH196CS0V"; // Match image data from image_64b43b.png

  // Form States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);

  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showNewBalance, setShowNewBalance] = useState(true);
  const [copiedTxId, setCopiedTxId] = useState(false);

  // Load Search History from LocalStorage
  useEffect(() => {
    const history = localStorage.getItem("p2p_search_history");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Handle Search Action
  const handleSearch = (queryText) => {
    const query = queryText || searchQuery;
    if (!query.trim()) return;

    let updatedHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ];
    updatedHistory = updatedHistory.slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("p2p_search_history", JSON.stringify(updatedHistory));
    setShowHistory(false);

    if (query.toUpperCase() === "U102") {
      setSearchedUser({
        uid: "U102",
        name: "Hamim Rahman",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      });
    } else {
      setSearchedUser({
        uid: query.toUpperCase(),
        name: "External User",
        image: null,
      });
    }
  };

  // Remove individual history item
  const removeHistoryItem = (e, item) => {
    e.stopPropagation();
    const updated = searchHistory.filter((h) => h !== item);
    setSearchHistory(updated);
    localStorage.setItem("p2p_search_history", JSON.stringify(updated));
  };

  // Absolute Mobile Cross-Platform Copy Engine
  const copyTransactionId = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(mockTxId)
        .then(() => triggerCopySuccess())
        .catch(() => fallbackCopyText(mockTxId));
    } else {
      fallbackCopyText(mockTxId);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // Keep offscreen and layout independent
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
    textArea.setSelectionRange(0, 99999); // Mobile compatibility layout fix

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

  // Share functionality handling names and TxID strings dynamically
  const handleShare = async () => {
    const dynamicName = searchedUser ? searchedUser.name : "V260";
    const shareText = `P2P Transfer Successful!\nSent: ৳${parseFloat(amount).toFixed(2)}\nTo Name: ${dynamicName}\nTransaction ID: ${mockTxId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Transaction Receipt",
          text: shareText,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback if browser doesn't support native web shares
      alert(shareText);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSearchQuery("");
    setSearchedUser(null);
    setAmount("");
    setReference("");
    setPin("");
  };

  return (
    <div className=" min-h-screen bg-main p-4 font-sans pb-16 flex flex-col">
      {/* Mobile Canvas View Box frame */}
      <div className="w-full max-w-md h-full flex-1 bg-subMain shadow-2xl rounded-3xl overflow-hidden flex flex-col relative border border-gray-200">
        {step < 4 && (
          <div className="bg-[#1e5399] text-white px-4 pt-6 pb-4 flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="hover:bg-blue-700 p-1 rounded-full transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-semibold tracking-wide flex-1">
              {step === 1 && "P to P Transfer"}
              {step === 2 && "Enter Amount"}
              {step === 3 && "Confirm Transfer"}
            </h1>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="p-4 flex flex-col gap-4 flex-1">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Find Recipient by UID
                </label>

                <div className="relative z-20">
                  <div className="flex items-center bg-gray-50 border border-gray-300 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <Search className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="Search User ID (e.g. U102)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowHistory(true)}
                      onBlur={() =>
                        setTimeout(() => setShowHistory(false), 200)
                      }
                      className="bg-transparent w-full outline-none text-gray-800 text-base"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")}>
                        <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>

                  {showHistory && searchHistory.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-30 max-h-60 overflow-y-auto py-2">
                      {searchHistory.map((item, index) => (
                        <div
                          key={index}
                          onMouseDown={() => {
                            setSearchQuery(item);
                            handleSearch(item);
                          }}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition"
                        >
                          <div className="flex items-center gap-2 text-gray-700">
                            <span className="text-gray-400 text-sm font-semibold">
                              🕒
                            </span>
                            <span>{item}</span>
                          </div>
                          <button
                            onMouseDown={(e) => removeHistoryItem(e, item)}
                            className="p-1 hover:bg-gray-200 rounded-full transition"
                          >
                            <X className="w-3.5 h-3.5 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSearch()}
                  className="w-full mt-3 bg-[#1e5399] text-white font-medium py-2.5 rounded-full shadow hover:bg-blue-700 transition"
                >
                  Search Recipient
                </button>
              </div>

              {searchedUser && (
                <div className="mt-2 animate-fadeIn">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
                    Search Result
                  </p>
                  <div
                    onClick={() => setStep(2)}
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm cursor-pointer hover:border-blue-400 hover:shadow transition"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-gray-200">
                      {searchedUser.image ? (
                        <img
                          src={searchedUser.image}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">
                        {searchedUser.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-mono">
                        UID: {searchedUser.uid}
                      </p>
                    </div>
                    <div className="bg-blue-50 text-[#1e5399] text-xs font-bold px-3 py-1.5 rounded-full">
                      Tap to Next
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="p-4 flex flex-col flex-1 gap-4 ">
              <div className="bg-white p-3 rounded-xl flex items-center gap-3 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {searchedUser?.image ? (
                    <img
                      src={searchedUser.image}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="text-gray-500 w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Sending to
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {searchedUser?.name} ({searchedUser?.uid})
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-5 ">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-xs text-amber-700 font-medium">
                      Available Balance:{" "}
                    </span>
                    <span className="text-sm font-bold text-amber-900">
                      ৳{availableBalance.toFixed(2)}
                    </span>
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Amount (৳)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-2xl font-bold text-gray-400">
                        ৳
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-9 pr-4 text-2xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Min. Amount ৳10
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Reference
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dinner split"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 mb-4 px-4 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  {amount && parseFloat(amount) > availableBalance && (
                    <p className="text-red-500 text-xs font-semibold text-center mb-2">
                      ❌ Insufficient funds available
                    </p>
                  )}
                  {amount && parseFloat(amount) < 10 && (
                    <p className="text-amber-600 text-xs font-semibold text-center mb-2">
                      ⚠️ Minimum transfer amount is ৳10
                    </p>
                  )}

                  <button
                    disabled={
                      !amount ||
                      parseFloat(amount) < 10 ||
                      parseFloat(amount) > availableBalance
                    }
                    onClick={() => setStep(3)}
                    className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="p-4 flex flex-col gap-4 flex-1 justify-between">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5">
                <h3 className="text-center font-bold text-gray-500 uppercase tracking-wider text-xs">
                  Review Summary
                </h3>

                <div className="divide-y divide-gray-100 bg-gray-50 rounded-xl p-3">
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-500">Receiver</span>
                    <span className="font-bold text-gray-800">
                      {searchedUser?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-500">Receiver UID</span>
                    <span className="font-mono font-semibold text-gray-800">
                      {searchedUser?.uid}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-500">Reference</span>
                    <span className="text-gray-800 italic">
                      {reference || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 text-base font-bold border-t-2 border-dashed border-gray-200">
                    <span className="text-gray-700">Total Amount</span>
                    <span className="text-[#1e5399]">
                      ৳{parseFloat(amount).toFixed(2)}
                    </span>
                  </div>
                </div>

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
                disabled={!pin.trim()}
                onClick={() => setStep(4)}
                className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-secondary/90 disabled:bg-gray-300 transition"
              >
                Confirm & Send Money
              </button>
            </div>
          )}

          {/* ================= STEP 4 (Sourced directly from image_64b43b.png visual design mapping) ================= */}
          {step === 4 && (
            <div className="bg-white flex flex-col flex-1 animate-fadeIn">
              <div className="flex flex-col items-center pt-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-green-600 font-bold text-lg mb-4">
                  <CheckCircle2 className="w-7 h-7 fill-green-50" />
                  <span>Your P to P is successful</span>
                </div>

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 mb-1">
                  {searchedUser?.image ? (
                    <img
                      src={searchedUser.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-gray-400 w-8 h-8" />
                  )}
                </div>
                <h2 className="text-3xl font-extrabold text-gray-700">
                  ID: {searchedUser?.uid || "V260"}
                </h2>
              </div>

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
                      title="Copy Transaction ID"
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
                  <p className="text-xs font-semibold text-gray-400">Total</p>
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
                    Reference
                  </p>
                  <p className="text-xs font-bold text-gray-700 mt-1">
                    {reference.trim() || "N/A"}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-400">
                    Sender / Receiver
                  </p>
                  <p className="text-[11px] font-semibold text-gray-600 mt-1">
                    Sender ID: {currentUserId}
                    <br />
                    Reciver ID: {searchedUser?.uid || "V260"}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-around items-center p-6 bg-gray-50">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-[#1e5399] font-bold text-xl hover:scale-105 transition transform"
                >
                  <Share2 className="w-6 h-6 fill-current" />
                  <span>Share</span>
                </button>
              </div>

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
