import React, { useState, useEffect, useRef } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";
import { Upload, X, Image as ImageIcon, Trash2 } from "lucide-react";

export default function EditPromotionModal({ onSaveSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [promoData, setPromoData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    bgImage: "",
    link: "",
  });

  const fileInputRef = useRef(null);
  const modalId = "edit_promotion_modal";

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      setPromoData(data);
      if (data) {
        setFormData({
          title: data.title || "",
          bgImage: data.bgImage || "",
          link: data.link || "",
        });
      } else {
        setFormData({ title: "", bgImage: "", link: "" });
      }
    });

    return () => unregister();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setPromoData(null);
    setFormData({ title: "", bgImage: "", link: "" });
  };

  // Convert uploaded image file to Data URL
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, bgImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, bgImage: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: promoData?.id || Date.now(),
      title: formData.title,
      bgImage: formData.bgImage,
      link: formData.link.trim() === "" ? null : formData.link,
    };

    if (onSaveSuccess) {
      onSaveSuccess(payload);
    }
    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title={promoData ? "Edit Promotion Banner" : "New Promotion Banner"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Banner Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Cashback Offer"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Image Upload / Preview Field */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Banner Image
          </label>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {formData.bgImage ? (
            /* Image Active Preview Zone */
            <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-900">
              <img
                src={formData.bgImage}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-white/90 rounded-xl text-slate-800 hover:bg-white text-xs font-bold shadow transition flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" /> Change
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-2 bg-rose-600/90 rounded-xl text-white hover:bg-rose-600 text-xs font-bold shadow transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              {/* Quick Remove Icon (Top Right) */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Upload Placeholder Zone */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition flex flex-col items-center justify-center space-y-2 bg-slate-50/50"
            >
              <div className="p-3 rounded-full bg-white shadow-sm border border-slate-100 text-slate-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">
                  Click to upload image
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  PNG, JPG, or WEBP up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Target Link Input */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Target Route Link (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. /promotions/cashback"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formData.bgImage}
            className={`px-4 py-2 font-medium text-sm rounded-xl shadow-md transition ${
              formData.bgImage
                ? "bg-[#073E7D] text-white hover:bg-blue-900"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {promoData ? "Save Changes" : "Create Banner"}
          </button>
        </div>
      </form>
    </MotherModal>
  );
}
