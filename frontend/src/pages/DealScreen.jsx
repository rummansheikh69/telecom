import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Clock,
  X,
  History,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Share2,
  AlertCircle,
} from "lucide-react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PageTitle from "../components/layout/PageTitle";
import Stars from "../components/ratings/Stars";

// Mock sellers database
const MOCK_SELLERS = [
  {
    id: "u102",
    name: "Tanvir Ahmed",
    rating: 4.8,
    reviewCount: 94,
    level: 2,
    bCount: 150,
    sCount: 120,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  {
    id: "u1013",
    name: "Md Rony Khan",
    rating: 4.5,
    reviewCount: 120,
    level: 1,
    bCount: 100,
    sCount: 100,
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&auto=format&fit=crop",
  },
];

export default function DealScreen() {
  const [step, setStep] = useState(1);

  // User State
  const myAvailableBalance = 1000.0;
  const currentUserId = "u1013";

  // Step 1: Search & History State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const searchContainerRef = useRef(null);

  // Step 2: Form State
  const [targetUser, setTargetUser] = useState(null);
  const [targetPhone, setTargetPhone] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryTime, setExpiryTime] = useState("15");
  const [formError, setFormError] = useState("");

  // Step 3: Success Screen State
  const [transactionData, setTransactionData] = useState(null);
  const [showBalance, setShowBalance] = useState(false);

  // Load Search History
  useEffect(() => {
    const saved = localStorage.getItem("deal_search_history");
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse search history", e);
      }
    }
  }, []);

  // Handle outside click for search history popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Submit
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim();
    const updated = [
      query,
      ...searchHistory.filter((i) => i.toLowerCase() !== query.toLowerCase()),
    ].slice(0, 6);

    setSearchHistory(updated);
    localStorage.setItem("deal_search_history", JSON.stringify(updated));
    setIsSearchFocused(false);

    const match = MOCK_SELLERS.find(
      (u) =>
        u.id.toLowerCase() === query.toLowerCase() ||
        u.name.toLowerCase().includes(query.toLowerCase()),
    );

    setFoundUser(match || null);
  };

  const removeHistoryItem = (e, item) => {
    e.stopPropagation();
    const updated = searchHistory.filter((i) => i !== item);
    setSearchHistory(updated);
    localStorage.setItem("deal_search_history", JSON.stringify(updated));
  };

  const handleSelectUser = (user) => {
    setTargetUser(user);
    setFormError("");
    setStep(2);
  };

  // Create Deal Submit
  const handleCreateDeal = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!targetPhone || targetPhone.length < 10) {
      setFormError("Please enter a valid phone number.");
      return;
    }
    if (!numAmount || isNaN(numAmount)) {
      setFormError("Please enter a valid amount.");
      return;
    }
    if (numAmount < 10) {
      setFormError("Minimum amount is 10.00৳");
      return;
    }
    if (numAmount > myAvailableBalance) {
      setFormError(
        `Insufficient balance! Your balance is ${myAvailableBalance.toFixed(2)}৳`,
      );
      return;
    }

    setFormError("");

    const now = new Date();
    const timeStr = now
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
    const dateStr = `${now.getDate().toString().padStart(2, "0")}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${now.getFullYear().toString().slice(-2)}`;

    setTransactionData({
      trxId: "DDH" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      time: `${timeStr} ${dateStr}`,
      totalAmount: numAmount,
      newBalance: myAvailableBalance - numAmount,
      reference: description.trim() || "N/A",
      senderId: currentUserId,
      receiverId: targetUser.id,
      receiverAvatar: targetUser.avatar,
    });

    setStep(3);
  };

  // Share Functionality
  const handleShare = async () => {
    if (!transactionData) return;

    const shareDetails = {
      title: "Deal Successful",
      text: `Deal Successful!\nTrxID: ${transactionData.trxId}\nAmount: TK ${transactionData.totalAmount.toFixed(2)}\nReceiver ID: ${transactionData.receiverId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareDetails);
      } catch (err) {
        console.log("Share cancelled/failed", err);
      }
    } else {
      navigator.clipboard.writeText(shareDetails.text);
      alert("Deal details copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-main font-sans pb-16">
      {/* Universal Page Title */}
      <PageTitle link="/" title="Create Deal" />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* CSS rule to hide default spin arrows on number inputs */}
        <style>{`
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type='number'] {
            -moz-appearance: textfield;
          }
        `}</style>

        {/* ========================================================================= */}
        {/* STEP 1: SEARCH SELLER                                                    */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Search Box */}
            <div ref={searchContainerRef} className="relative z-30">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div
                  className={`flex items-center bg-white border ${
                    isSearchFocused
                      ? "border-secondary ring-2 ring-secondary/10"
                      : "border-gray-200"
                  } rounded-2xl transition px-3.5 py-3 shadow-sm`}
                >
                  <Search className="w-5 h-5 text-gray-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    placeholder="Search User ID (e.g. u102) or Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setFoundUser(null);
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600 mr-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-secondary text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow-sm active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Google-like Search History Dropdown */}
              {isSearchFocused && searchHistory.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 overflow-hidden z-40">
                  <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                      <History className="w-3 h-3" /> Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchHistory([]);
                        localStorage.removeItem("deal_search_history");
                      }}
                      className="text-[10px] font-bold text-rose-500 hover:underline"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto">
                    {searchHistory.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchQuery(item);
                          setIsSearchFocused(false);
                          const match = MOCK_SELLERS.find(
                            (u) =>
                              u.id.toLowerCase() === item.toLowerCase() ||
                              u.name.toLowerCase().includes(item.toLowerCase()),
                          );
                          setFoundUser(match || null);
                        }}
                        className="flex items-center justify-between px-3.5 py-2 hover:bg-gray-50 cursor-pointer group transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <History className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-xs font-semibold text-gray-700 truncate group-hover:text-secondary">
                            {item}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => removeHistoryItem(e, item)}
                          className="p-1 rounded-full text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Search Match Result */}
            {foundUser ? (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
                  Matched Seller Profile
                </span>
                <div
                  onClick={() => handleSelectUser(foundUser)}
                  className="bg-subMain rounded-2xl p-4 shadow-lg border border-gray-200 cursor-pointer hover:border-secondary transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-secondary p-[2px] bg-gray-200 flex-shrink-0 relative">
                      {foundUser.verified && (
                        <VscVerifiedFilled className="absolute -top-1 bg-white rounded-full right-0 text-secondary size-4" />
                      )}
                      <img
                        src={foundUser.avatar}
                        alt={foundUser.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-gray-800">
                        {foundUser.name}
                      </h2>
                      <p className="text-xs font-semibold text-gray-600 uppercase">
                        UID: {foundUser.id}
                      </p>
                      <Stars
                        rating={foundUser.rating}
                        reviewCount={foundUser.reviewCount}
                      />
                    </div>
                  </div>
                  <button className="bg-secondary text-white text-xs font-medium px-3.5 py-2 rounded-xl">
                    Select
                  </button>
                </div>
              </div>
            ) : searchQuery && !isSearchFocused ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-gray-300">
                <p className="text-xs font-bold text-gray-600">
                  No seller found matching "{searchQuery}"
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Try searching for <span className="font-bold">u102</span>
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: DEAL CREATION FORM                                                */}
        {/* ========================================================================= */}
        {step === 2 && targetUser && (
          <form onSubmit={handleCreateDeal} className="space-y-4">
            {/* Custom Seller Profile Card (Balance strictly hidden) */}
            <div className="bg-subMain rounded-2xl p-4 shadow-lg border relative flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2 w-full">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full border-2 border-secondary p-[2px] bg-gray-200 flex-shrink-0 relative">
                  {targetUser.verified && (
                    <VscVerifiedFilled className="absolute -top-1 bg-white rounded-full right-0 text-secondary size-5" />
                  )}
                  <img
                    src={targetUser.avatar}
                    alt={targetUser.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="gap-1 flex justify-between flex-1">
                  {/* Seller Info */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {targetUser.name}
                    </h2>
                    {/* Seller balance line is explicitly omitted */}
                    <Stars
                      rating={targetUser.rating}
                      reviewCount={targetUser.reviewCount}
                    />
                  </div>

                  <div className="ml-2 sm:ml-6 mt-1">
                    <p className="text-xs font-semibold">
                      LV: <span>{targetUser.level}</span>
                    </p>
                    <p className="text-sm">
                      UID: <span className="uppercase">{targetUser.id}</span>
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="uppercase text-sm text-textPrimary font-light">
                        b({targetUser.bCount})
                      </p>
                      <p className="uppercase text-sm text-textPrimary font-light">
                        s({targetUser.sCount})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Notification */}
            {formError && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-2.5 rounded-r-xl flex items-center gap-2 text-rose-700 text-xs font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form Fields Container */}
            <div className="space-y-3.5 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              {/* Target Number Input */}
              <div>
                <label className="text-[11px] font-extrabold text-gray-600 uppercase tracking-wider block mb-1">
                  Number *
                </label>
                <input
                  type="number"
                  placeholder="Enter phone number"
                  value={targetPhone}
                  onChange={(e) => setTargetPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-secondary focus:bg-white transition"
                />
              </div>

              {/* Deal Description Textarea (Fixed Height) */}
              <div>
                <label className="text-[11px] font-extrabold text-gray-600 uppercase tracking-wider block mb-1">
                  Description of Deal
                </label>
                <textarea
                  rows={3}
                  placeholder="Write clear deal terms or order details here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-secondary focus:bg-white transition resize-none h-20"
                />
              </div>

              {/* Amount Input with Available Balance header */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-extrabold text-gray-600 uppercase tracking-wider">
                    Amount (Min 10.00৳) *
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Available: {myAvailableBalance.toFixed(2)}৳
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-black text-gray-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3.5 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-secondary focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Deal Expiry Dropdown */}
              <div>
                <label className="text-[11px] font-extrabold text-gray-600 uppercase tracking-wider block mb-1">
                  Deal Expiry Time
                </label>
                <div className="relative flex items-center">
                  <Clock className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <select
                    value={expiryTime}
                    onChange={(e) => setExpiryTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-secondary focus:bg-white transition appearance-none cursor-pointer"
                  >
                    <option value="15">15 Minutes (Default)</option>
                    <option value="20">20 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="60">60 Minutes (1 Hour)</option>
                  </select>
                  <div className="absolute right-3.5 pointer-events-none text-gray-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-secondary text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition active:scale-[0.98]"
            >
              Confirm & Start Deal
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: DEAL SUCCESS PAGE                                                 */}
        {/* ========================================================================= */}
        {step === 3 && transactionData && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-200 space-y-6">
              {/* Success Header */}
              <div className="flex flex-col items-center space-y-3 pt-2">
                <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-base tracking-wide">
                  <CheckCircle2 className="w-6 h-6 fill-emerald-100 text-emerald-600" />
                  <span>Your Deal is successful</span>
                </div>

                {/* Receiver Info */}
                <div className="flex flex-col items-center space-y-1.5">
                  <img
                    src={transactionData.receiverAvatar}
                    alt="Receiver"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  />
                  <h2 className="text-xl font-black text-gray-800 tracking-wider">
                    ID: {transactionData.receiverId.toUpperCase()}
                  </h2>
                </div>
              </div>

              {/* 2-Column Details Table */}
              <div className="border border-gray-100 rounded-2xl divide-y divide-gray-100 text-xs">
                {/* Time & TrxID */}
                <div className="grid grid-cols-2 divide-x divide-gray-100 p-3.5">
                  <div className="pr-2 space-y-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Time
                    </span>
                    <p className="font-bold text-gray-800 text-[11px]">
                      {transactionData.time}
                    </p>
                  </div>
                  <div className="pl-3 space-y-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Transaction ID
                    </span>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-800 text-[11px] font-mono">
                        {transactionData.trxId}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(transactionData.trxId);
                          alert("Transaction ID copied!");
                        }}
                        className="text-pink-500 hover:text-pink-600 transition p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total & Privacy Toggleable Balance */}
                <div className="grid grid-cols-2 divide-x divide-gray-100 p-3.5">
                  <div className="pr-2 space-y-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Total
                    </span>
                    <p className="font-black text-gray-900 text-sm">
                      TK: {transactionData.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="pl-3 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        New Balance
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        {showBalance ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="font-black text-gray-900 text-sm">
                      {showBalance
                        ? `TK: ${transactionData.newBalance.toFixed(2)}`
                        : "TK: ••••••"}
                    </p>
                  </div>
                </div>

                {/* Reference & IDs */}
                <div className="grid grid-cols-2 divide-x divide-gray-100 p-3.5">
                  <div className="pr-2 space-y-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Reference
                    </span>
                    <p className="font-bold text-gray-700 text-[11px] line-clamp-2">
                      {transactionData.reference}
                    </p>
                  </div>
                  <div className="pl-3 space-y-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Sender / Receiver
                    </span>
                    <p className="font-bold text-gray-600 text-[10px] leading-tight">
                      Sender ID: {transactionData.senderId.toUpperCase()}
                    </p>
                    <p className="font-bold text-gray-600 text-[10px] leading-tight">
                      Receiver ID: {transactionData.receiverId.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Share Action */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 text-secondary font-black text-base transition active:scale-95"
                >
                  <Share2 className="w-5 h-5 stroke-[2.5]" />
                  <span>Share</span>
                </button>
              </div>

              {/* Back Link */}
              <Link to="/" className="block">
                <button
                  type="button"
                  className="w-full py-3.5 bg-secondary text-white font-black text-xs uppercase tracking-wider rounded-2xl transition active:scale-95 shadow-md"
                >
                  &lt; Back To Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
