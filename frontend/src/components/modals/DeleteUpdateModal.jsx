import React, { useState, useEffect } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";

export default function DeleteUpdateModal({ onDeleteSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  const modalId = "delete_update_modal";

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
      title="Delete Update / News"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete this update item?
        </p>

        {itemData && (
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-1">
            <p className="text-xs font-bold text-secondary">{itemData.title}</p>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              {itemData.text}
            </p>
          </div>
        )}

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
            className="px-4 py-2 bg-rose-600 text-white font-medium text-sm rounded-xl hover:bg-rose-700 shadow-md transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </MotherModal>
  );
}
