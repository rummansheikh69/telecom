// DeleteReviewModal.jsx
import React, { useState, useEffect } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";

export default function DeleteReviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const modalId = "delete_review_modal"; // The ID this modal answers to

  useEffect(() => {
    // Register this component to the global event system
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      if (data) setReviewData(data);
    });

    return () => unregister();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setReviewData(null);
  };

  const confirmDelete = () => {
    console.log(`Deleting user from DB with ID: ${reviewData?.userId}`);
    // Put your Axios / Fetch delete request here
    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Danger Zone: Delete User"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to permanently delete{" "}
          <strong className="text-slate-900">{reviewData?.username}</strong>{" "}
          Review? This action cannot be undone.
        </p>

        {/* Displaying the MongoDB Object ID as context */}
        <div className="rounded-lg bg-red-50 p-3 font-mono text-xs text-red-600 border border-red-100">
          <strong>Comment:</strong> {reviewData?.user_comment}
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
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
