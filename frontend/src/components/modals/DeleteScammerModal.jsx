import React, { useState, useEffect } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";

export default function DeleteScammerModal({ onDeleteSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  const modalId = "delete_scammer_modal";

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
      onDeleteSuccess(itemData?.id);
    }
    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Scammer Report"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to remove this scammer report from the
          directory?
        </p>

        {itemData && (
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200">
              <img
                src={
                  itemData.photo ||
                  "https://placehold.co/100x100/e2e8f0/64748b?text=User"
                }
                alt={itemData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {itemData.phone}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {itemData.name} • {itemData.location}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3 pt-2 border-t border-slate-100">
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
            className="px-4 py-2 bg-rose-600 text-white font-medium text-sm rounded-xl hover:bg-rose-700 shadow-md transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </MotherModal>
  );
}
