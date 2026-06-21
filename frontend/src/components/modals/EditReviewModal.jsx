import React, { useState, useEffect } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";

export default function EditReviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  const modalId = "edit_review_modal"; // The ID this modal answers to

  useEffect(() => {
    // Register this component to the global event system
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      if (data) {
        setReviewId(data.reviewId || data._id); // Handles your DB identifier
        setRating(data.rating || 5);
        setComment(data.user_comment || "");
        setUsername(data.username || "User");
      }
    });

    return () => unregister();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Resetting state after closure
    setReviewId(null);
    setRating(0);
    setComment("");
    setUsername("");
  };

  const handleSave = () => {
    console.log(`Updating Review ID: ${reviewId}`);
    console.log(`New Rating: ${rating}, New Comment: ${comment}`);

    // Put your Axios / Fetch PUT/PATCH request here:
    // axios.put(`/api/reviews/${reviewId}`, { rating, comment })

    handleClose();
  };

  return (
    <MotherModal isOpen={isOpen} onClose={handleClose} title="Edit Your Review">
      <div className="space-y-5">
        <div>
          <p className="text-sm text-slate-500 mb-3">
            Modifying review submitted for{" "}
            <strong className="text-slate-800">{username}</strong>
          </p>

          {/* Interactive Star Rating Selector */}
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl transition-transform active:scale-95 focus:outline-none"
              >
                <span
                  className={
                    star <= rating ? "text-amber-400" : "text-slate-200"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Area for Comment */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Review Comment
          </label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your experience here..."
            className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition focus:outline-none resize-none"
          />
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-xl hover:bg-blue-700 shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </MotherModal>
  );
}
