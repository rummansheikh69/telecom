import React, { useState, useEffect, useRef } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";
import { Upload, X, Image as ImageIcon, Trash2 } from "lucide-react";

export default function EditUpdateModal({ onSaveSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  // Single Form Data State
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    selectedFile: null,
    previewUrl: "",
  });

  const fileInputRef = useRef(null);
  const modalId = "edit_update_modal";

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      setItemData(data);

      if (data) {
        setFormData({
          title: data.title || "",
          text: data.text || "",
          selectedFile: null,
          previewUrl: data.image || "",
        });
      } else {
        resetForm();
      }
    });

    return () => unregister();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      text: "",
      selectedFile: null,
      previewUrl: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setIsOpen(false);
    setItemData(null);
    resetForm();
  };

  // Generic Field Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      selectedFile: file,
      previewUrl: URL.createObjectURL(file),
    }));
  };

  // Remove Selected Image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      selectedFile: null,
      previewUrl: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚀 Construct native FormData payload ready for API calls
    const payload = new FormData();
    if (itemData?.id) {
      payload.append("id", itemData.id);
    }
    payload.append("title", formData.title);
    payload.append("text", formData.text);

    if (formData.selectedFile) {
      payload.append("image", formData.selectedFile);
    }

    if (onSaveSuccess) {
      onSaveSuccess({
        formDataPayload: payload,
        uiPreviewData: {
          id: itemData?.id || `up_${Date.now()}`,
          title: formData.title,
          text: formData.text,
          image: formData.previewUrl,
        },
      });
    }

    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title={itemData ? "Edit Update Post" : "Create New Update Post"}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Title Input */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Update Headline <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            name="title"
            placeholder="e.g. Weekend cashback offer: Get 10% cashback"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Text Content */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            name="text"
            rows={3}
            placeholder="Don't miss out on this limited-time offer to save more on your purchases!"
            value={formData.text}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-secondary resize-none"
          />
        </div>

        {/* Image Upload Zone */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Featured Image
          </label>

          <input
            type="file"
            ref={fileInputRef}
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {formData.previewUrl ? (
            <div className="relative h-28 rounded-xl overflow-hidden border border-slate-200 group bg-slate-900">
              <img
                src={formData.previewUrl}
                alt="Update Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 bg-white rounded-lg text-slate-800 text-xs font-bold flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" /> Change
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/70 text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-secondary hover:bg-blue-50/20 cursor-pointer transition flex flex-col items-center justify-center space-y-1 bg-slate-50"
            >
              <ImageIcon className="w-5 h-5 text-slate-400" />
              <p className="text-xs font-bold text-slate-600">
                Click to upload news image
              </p>
            </div>
          )}
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
            className="px-4 py-2 bg-secondary text-white font-medium text-sm rounded-xl hover:bg-blue-900 shadow-md transition"
          >
            {itemData ? "Save Changes" : "Post Update"}
          </button>
        </div>
      </form>
    </MotherModal>
  );
}
