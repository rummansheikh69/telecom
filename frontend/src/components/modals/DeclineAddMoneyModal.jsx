import React, { useState } from "react";
import { MotherModal } from "./MotherModal";
import { AlertTriangle, XCircle } from "lucide-react";

export function DeclineAddMoneyModal({
  isOpen,
  onClose,
  request,
  onConfirmDecline,
}) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!request) return null;

  // Preset quick reasons for faster admin action
  const QUICK_REASONS = [
    "Invalid Transaction ID",
    "Screenshot is unclear / missing",
    "Amount does not match statement",
    "Duplicate request",
  ];

  const handleDeclineSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Please provide or select a decline reason.");
      return;
    }

    setError("");
    onConfirmDecline(reason.trim());
    setReason("");
    onClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={() => {
        setReason("");
        setError("");
        onClose();
      }}
      title="Decline Add Money Request"
    >
      <form onSubmit={handleDeclineSubmit} className="space-y-4">
        {/* Warning Badge */}
        <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-2.5 text-rose-700 text-xs">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>
            Rejecting this request will notify the user. Please specify the
            reason below.
          </span>
        </div>

        {/* Transaction Brief Card */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
          <div className="flex justify-between font-bold text-slate-800">
            <span>User: {request.userName}</span>
            <span className="uppercase text-[#073E7D]">
              UID: {request.userId}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Method: {request.method}</span>
            <span className="font-mono font-bold text-slate-800">
              TxID: {request.txId}
            </span>
          </div>
          <div className="pt-1 font-black text-rose-600 text-sm">
            Requested Amount: ৳{request.amount?.toFixed(2)}
          </div>
        </div>

        {/* Quick Reason Chips */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
            Quick Select Reason
          </label>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_REASONS.map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setReason(preset);
                  setError("");
                }}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                  reason === preset
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Reason Textarea */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
            Custom Decline Reason *
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (e.target.value.trim()) setError("");
            }}
            placeholder="Type reason for rejection..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-500 focus:bg-white transition resize-none"
          />
          {error && (
            <p className="text-[11px] font-bold text-rose-500 mt-1">{error}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setReason("");
              setError("");
              onClose();
            }}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            Confirm Decline
          </button>
        </div>
      </form>
    </MotherModal>
  );
}
