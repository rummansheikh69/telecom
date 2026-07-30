import React, { useState, useEffect } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";

export default function DeletePromotionModal({ onDeleteSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [promoData, setPromoData] = useState(null);

  const modalId = "delete_promotion_modal";

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      if (data) setPromoData(data);
    });

    return () => unregister();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setPromoData(null);
  };

  const confirmDelete = () => {
    // Execute callback or API call
    if (onDeleteSuccess) {
      onDeleteSuccess(promoData?.id);
    }
    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Promotion Banner"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete the promotion banner{" "}
          <strong className="text-slate-900">{promoData?.title}</strong>?
        </p>

        {promoData?.bgImage && (
          <div className="relative h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${promoData.bgImage})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-3 flex items-end h-full">
              <span className="text-xs font-bold text-white">
                {promoData.title}
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            type="button"
            className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            type="button"
            className="px-4 py-2 bg-red-600 text-white font-medium text-sm rounded-xl hover:bg-red-700 shadow-md transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </MotherModal>
  );
}
