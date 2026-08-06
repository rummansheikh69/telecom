import React from "react";
import { MotherModal } from "./MotherModal";

export function AddMoneyConfirmModal({
  isOpen,
  onClose,
  type, // "accept" | "decline"
  request,
  declineReason,
  setDeclineReason,
  onConfirm,
}) {
  if (!request) return null;

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={onClose}
      title={type === "accept" ? "Approve Add Money" : "Decline Add Money"}
    >
      {type === "accept" ? (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Confirm approval for this transaction? Balance will be credited
            instantly.
          </p>
          <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
            <p className="font-bold text-slate-800">
              User: {request.userName} ({request.userId})
            </p>
            <p className="font-black text-[#073E7D]">
              Amount: ৳{request.amount.toFixed(2)}
            </p>
            <p className="font-mono text-slate-500">TxID: {request.txId}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Confirm Approval
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Enter a reason for rejection:
          </p>
          <textarea
            rows={3}
            placeholder="e.g. Invalid Transaction ID or proof image"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-rose-500"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Decline Request
            </button>
          </div>
        </div>
      )}
    </MotherModal>
  );
}
