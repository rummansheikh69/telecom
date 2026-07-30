import React, { useState, useEffect } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";

export default function DeleteHelplineModal({ onDeleteSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  const modalId = "delete_helpline_modal";

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      if (data) setItemData(data);
    });

    return () => unregister();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setItemData(null);
  };

  const confirmDelete = () => {
    if (onDeleteSuccess) {
      onDeleteSuccess(itemData?.id, itemData?.category);
    }
    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Directory Entry"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete{" "}
          <strong className="text-slate-900">{itemData?.title}</strong> from the{" "}
          <span className="font-semibold text-secondary">
            {itemData?.category}
          </span>{" "}
          category?
        </p>

        <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-400">Code/USSD:</span>
            <span className="font-mono font-bold text-secondary">
              {itemData?.code}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Note:</span>
            <span className="text-slate-700">{itemData?.note}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white font-medium text-sm rounded-xl hover:bg-red-700 shadow-md transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </MotherModal>
  );
}
