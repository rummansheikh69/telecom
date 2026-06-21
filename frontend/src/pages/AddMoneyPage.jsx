import React, { useState, useRef } from "react";
import PageTitle from "../components/layout/PageTitle";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  UploadCloud,
  ChevronDown,
  Building2,
  Wallet,
  Info,
  X,
  FileText,
  Calendar,
  Layers,
  Edit2, // Added Lucide icon for the mobile pen button
} from "lucide-react";

export default function AddMoneyPage() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [txId, setTxId] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const [copiedField, setCopiedField] = useState(null);
  const [openBankId, setOpenBankId] = useState(null);
  const fileInputRef = useRef(null);

  const paymentMethods = [
    {
      name: "Bkash",
      image: "images/bkash.svg",
    },
    {
      name: "Nagad",
      image: "images/nagad.png",
    },
    {
      name: "Rocket",
      image: "images/rocket.webp",
    },
    {
      name: "Binance",
      image: "images/binance.svg",
    },
    {
      name: "Bank",
      image: "images/bank.webp",
    },
  ];

  const mockBanks = [
    {
      id: "ebl",
      bankName: "Eastern Bank PLC (EBL)",
      title: "Rony Khan Enterprises",
      account: "1042930492031",
      branch: "Uttara Branch",
      routingNumber: "070261415",
    },
    {
      id: "city",
      bankName: "The City Bank PLC",
      title: "Rony Khan Digital Ltd",
      account: "3102948102938",
      branch: "Gulshan Avenue Branch",
      routingNumber: "225271482",
    },
  ];

  const isStep1Valid = () => amount && parseFloat(amount) > 0;
  const isStep2Valid = () => isStep1Valid() && selectedMethod !== "";
  const isStep3Valid = () =>
    isStep2Valid() && txId.trim().length >= 4 && screenshot !== null;

  const handleStepJump = (targetStep) => {
    if (targetStep === 1) setStep(1);
    if (targetStep === 2 && isStep1Valid()) setStep(2);
    if (targetStep === 3 && isStep2Valid()) setStep(3);
  };

  const handleCopyText = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setScreenshot(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    if (method === "Bank" && mockBanks.length > 0) {
      setOpenBankId(mockBanks[0].id);
    }
    setStep(3);
  };

  const getMethodTheme = (method) => {
    const lowMethod = method ? method.toLowerCase() : "";
    if (lowMethod.includes("bkash"))
      return { bg: "bg-[#D8136B]", text: "text-[#D8136B]", num: "01401458564" };
    if (lowMethod.includes("rocket"))
      return {
        bg: "bg-[#8F2A85]",
        text: "text-[#8F2A85]",
        num: "01401458564-9",
      };
    if (lowMethod.includes("nagad"))
      return { bg: "bg-[#F46F22]", text: "text-[#F46F22]", num: "01601458564" };
    if (lowMethod.includes("binance"))
      return {
        bg: "bg-[#F3BA2F]",
        text: "text-[#F3BA2F]",
        num: "9482015",
      };
    return {
      bg: "bg-[#073E7D]",
      text: "text-[#073E7D]",
      num: "See configurations below",
    };
  };

  const currentTheme = getMethodTheme(selectedMethod);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (txId.trim().length >= 4 && screenshot) {
      setStep(4);
    }
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between font-sans">
      <div>
        <PageTitle
          link={step === 1 ? "/profile" : undefined}
          title="Add Money"
          onClick={step > 1 && step < 4 ? () => setStep(step - 1) : undefined}
        />

        {step < 4 && (
          <div className="px-4 mt-4">
            <div className="bg-white border border-slate-100 rounded-xl p-3 flex justify-between items-center text-xs font-medium text-slate-400 shadow-sm">
              <button
                type="button"
                onClick={() => handleStepJump(1)}
                className={`transition ${step >= 1 ? "text-[#073E7D] font-bold" : ""}`}
              >
                1. Amount
              </button>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <button
                type="button"
                disabled={!isStep1Valid()}
                onClick={() => handleStepJump(2)}
                className={`transition ${step >= 2 ? "text-[#073E7D] font-bold" : "disabled:opacity-50"}`}
              >
                2. Method
              </button>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <button
                type="button"
                disabled={!isStep2Valid()}
                onClick={() => handleStepJump(3)}
                className={`transition ${step === 3 ? "text-[#073E7D] font-bold" : "disabled:opacity-50"}`}
              >
                3. Payment
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 px-4 pb-16">
          {/* ================= STEP 1: ENTER AMOUNT ================= */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-[#073E7D] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Wallet className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">
                  How much would you like to add?
                </h3>

                <div className="relative mt-5 max-w-xs mx-auto">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-center text-2xl font-bold py-3 px-4 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition text-slate-800 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    ৳
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!isStep1Valid()}
                className={`w-full py-3.5 font-semibold text-sm rounded-xl tracking-wide flex items-center justify-center gap-2 transition-all duration-200
                  ${isStep1Valid() ? "bg-[#073E7D] text-white hover:bg-blue-900 shadow-md" : "bg-[#CCD8E6] text-slate-400 cursor-not-allowed"}`}
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= STEP 2: CHOOSE METHOD ================= */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1 mb-1">
                Select Payment Method
              </p>
              {paymentMethods.map((method, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectMethod(method.name)}
                  className="w-full bg-white border border-slate-100 hover:border-blue-200 p-4 rounded-xl flex items-center justify-between shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center font-bold text-xs text-slate-600">
                      <img
                        src={method.image}
                        alt={method.name}
                        className=" w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {method.name}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.name ? "border-[#073E7D]" : "border-slate-200"}`}
                  >
                    {selectedMethod === method.name && (
                      <div className="w-2.5 h-2.5 bg-[#073E7D] rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ================= STEP 3: TRANSACTION INSTRUCTIONS & PROOF ================= */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col">
                <div className="w-full py-2 px-4 rounded-full bg-slate-100 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs">
                    <Info className="w-4 h-4 text-slate-500" />
                    <span>Kothasongkolon Payments</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="p-1 rounded-full hover:bg-slate-200 transition"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <div className="w-full mb-4">
                  <input
                    type="text"
                    required
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    placeholder="ট্রান্সজেকশন আইডি দিন (Transaction ID)"
                    className="w-full px-4 py-2.5 border border-slate-300 text-center text-sm rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition font-medium"
                  />
                </div>

                {selectedMethod !== "Bank" ? (
                  <div
                    className={`p-4 rounded-xl text-white text-xs space-y-2.5 leading-relaxed ${currentTheme.bg}`}
                  >
                    <li className="list-none font-semibold">
                      ১. আপনার {selectedMethod} ওয়ালেটে বা অ্যাপে প্রবেশ করুন।
                    </li>
                    <div className="border-b border-white/20 w-full" />
                    <li className="list-none">
                      ২. "Send Money" বিকল্পটি নির্বাচন করুন।
                    </li>
                    <div className="border-b border-white/20 w-full" />
                    <li className="list-none flex items-center justify-between">
                      <span>
                        ৩. প্রাপক নম্বর:{" "}
                        <strong className="font-mono underline tracking-wider">
                          {currentTheme.num}
                        </strong>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(currentTheme.num, "gateway")
                        }
                        className="bg-white/20 p-1 rounded hover:bg-white/30 transition"
                      >
                        {copiedField === "gateway" ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </li>
                    <div className="border-b border-white/20 w-full" />
                    <li className="list-none">
                      ৪. টাকার পরিমাণ নির্ধারণ করুন: <strong>৳{amount}</strong>
                    </li>
                    <div className="border-b border-white/20 w-full" />
                    <li className="list-none">
                      ৫. পিন কোড দিয়ে লেনদেনটি সম্পন্ন করুন।
                    </li>
                    <div className="border-b border-white/20 w-full" />
                    <li className="list-none font-medium text-amber-100">
                      ৬. সফলভাবে সম্পন্ন হওয়ার পর প্রাপ্ত ট্রানজেকশন আইডিটি কপি
                      করে উপরের বক্সে পেস্ট করুন এবং নিচে স্ক্রিনশট সংযুক্ত
                      করুন।
                    </li>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mockBanks.map((bank) => {
                      const isExpanded = openBankId === bank.id;
                      return (
                        <div
                          key={bank.id}
                          className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenBankId(isExpanded ? null : bank.id)
                            }
                            className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-bold text-slate-700"
                          >
                            <span className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-[#073E7D]" />{" "}
                              {bank.bankName}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="p-3 bg-white border-t border-slate-100 space-y-2 text-[11px] font-medium text-slate-600 animate-fadeIn">
                              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                <span>Account Title:</span>
                                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                                  <span>{bank.title}</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopyText(bank.title, "bt")
                                    }
                                    className="text-slate-400"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                <span>Account Number:</span>
                                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                                  <span>{bank.account}</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopyText(bank.account, "ba")
                                    }
                                    className="text-slate-400"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                <span>Routing Number:</span>
                                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                                  <span>{bank.routingNumber}</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopyText(bank.routingNumber, "br")
                                    }
                                    className="text-slate-400"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-1 text-slate-500">
                                <span>Branch:</span>
                                <span className="font-semibold text-slate-700">
                                  {bank.branch}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile-Friendly Image Upload Component Area */}
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 text-center">
                  Payment Proof Screenshot
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleScreenshotUpload}
                  accept="image/*"
                  className="hidden"
                />

                {screenshot ? (
                  /* Fixed Mobile View Box with absolute action icon wrapper (no hover required) */
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 max-w-xs mx-auto aspect-video bg-slate-50 shadow-inner animate-scaleIn">
                    <img
                      src={screenshot}
                      alt="Screenshot receipt"
                      className="w-full h-full object-cover"
                    />

                    {/* Top Right Thumb-Friendly Pen Trigger Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="absolute top-2 right-2 bg-black/10 active:bg-black/30 backdrop-blur-md text-white p-2 rounded-lg shadow-md transition flex items-center justify-center border border-white/10"
                      title="Change Screenshot"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full border-2 border-dashed border-slate-200 active:border-blue-400 rounded-xl py-6 flex flex-col items-center justify-center gap-1.5 bg-slate-50/50 transition"
                  >
                    <UploadCloud className="w-7 h-7 text-slate-400 stroke-[1.5]" />
                    <span className="text-xs font-semibold text-slate-600">
                      Upload Transaction Screenshot
                    </span>
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={txId.trim().length < 4 || !screenshot}
                className={`w-full py-3.5 text-center font-semibold text-sm rounded-xl tracking-wide flex items-center justify-center gap-2 transition shadow-sm
                  ${
                    txId.trim().length >= 4 && screenshot
                      ? "bg-[#073E7D] text-white hover:bg-blue-900 shadow-md cursor-pointer"
                      : "bg-[#CCD8E6] text-slate-400 cursor-not-allowed"
                  }`}
              >
                <CheckCircle2 className="w-4 h-4" /> Confirm & Verify Request
              </button>
            </form>
          )}

          {/* ================= STEP 4: ONBOARD RECEIPT SUMMARY SCREEN ================= */}
          {step === 4 && (
            <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg animate-scaleIn">
              <div className="bg-[#073E7D] p-6 text-center text-white relative">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-base font-bold tracking-wide">
                  Request Submitted
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  Your add money request is pending audit clearance
                </p>
                <div className="absolute -bottom-3 left-0 right-0 h-6 bg-white rounded-t-2xl" />
              </div>

              <div className="p-6 pt-2 bg-white space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Transaction Summary
                  </span>
                </div>

                <div className="space-y-2.5 text-xs font-medium text-slate-600">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Add Money Amount</span>
                    <span className="text-lg font-bold text-slate-900">
                      ৳{parseFloat(amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Payment Gateway</span>
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {selectedMethod}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Transaction ID</span>
                    <span className="font-mono font-bold text-slate-800 tracking-wider bg-blue-50 text-[#073E7D] px-2 py-0.5 rounded-md">
                      {txId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Submission Date</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />{" "}
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Audit Status</span>
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Verifying Proof
                    </span>
                  </div>
                </div>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-dashed border-slate-200"></div>
                  <span className="flex-shrink mx-2 text-[10px] text-slate-300 font-mono uppercase">
                    kothasongkolon RECEIPT
                  </span>
                  <div className="flex-grow border-t border-dashed border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setAmount("");
                    setSelectedMethod("");
                    setTxId("");
                    setScreenshot(null);
                  }}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl tracking-wide transition text-center"
                >
                  Make Another Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
