import React, { useState, useEffect, useRef } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";
import { Upload, X, Image as ImageIcon, Trash2 } from "lucide-react";

export default function EditAppModal({ onSaveSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  // Single Form State
  const [formData, setFormData] = useState({
    name: "",
    brief: "",
    rating: "4.8",
    size: "15 MB",
    downloadUrl: "",
    selectedFile: null,
    iconPreview: "",
  });

  const fileInputRef = useRef(null);
  const modalId = "edit_app_modal";

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      setItemData(data);

      if (data) {
        setFormData({
          name: data.name || "",
          brief: data.brief || "",
          rating: data.rating || "4.8",
          size: data.size || "15 MB",
          downloadUrl: data.downloadUrl || "",
          selectedFile: null,
          iconPreview: data.icon || "",
        });
      } else {
        resetForm();
      }
    });

    return () => unregister();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      brief: "",
      rating: "4.8",
      size: "15 MB",
      downloadUrl: "",
      selectedFile: null,
      iconPreview: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setIsOpen(false);
    setItemData(null);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      selectedFile: file,
      iconPreview: URL.createObjectURL(file),
    }));
  };

  const handleRemoveIcon = () => {
    setFormData((prev) => ({
      ...prev,
      selectedFile: null,
      iconPreview: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚀 Native FormData payload created for API integration
    const payload = new FormData();
    if (itemData?.id) {
      payload.append("id", itemData.id);
    }
    payload.append("name", formData.name);
    payload.append("brief", formData.brief);
    payload.append("rating", formData.rating);
    payload.append("size", formData.size);
    payload.append("downloadUrl", formData.downloadUrl);

    if (formData.selectedFile) {
      payload.append("icon", formData.selectedFile);
    }

    if (onSaveSuccess) {
      onSaveSuccess({
        formDataPayload: payload,
        uiPreviewData: {
          id: itemData?.id || `app_${Date.now()}`,
          name: formData.name,
          brief: formData.brief,
          rating: formData.rating,
          size: formData.size,
          downloadUrl: formData.downloadUrl,
          icon:
            formData.iconPreview ||
            "https://placehold.co/100x100/073E7D/white?text=APP",
          isInstalled: itemData?.isInstalled || false,
        },
      });
    }

    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title={itemData ? "Edit App Listing" : "Add New Application"}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* App Name */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Application Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            name="name"
            placeholder="e.g. Star2Pay Merchant"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D]"
          />
        </div>

        {/* Brief Description */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Brief Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            name="brief"
            rows={3}
            placeholder="Accept instant P2P payments, view real-time settlement reports..."
            value={formData.brief}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D] resize-none"
          />
        </div>

        {/* Direct Download Link */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Direct Download URL (.apk / link){" "}
            <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            required
            name="downloadUrl"
            placeholder="https://example.com/downloads/app.apk"
            value={formData.downloadUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D]"
          />
        </div>

        {/* Rating & Size Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Rating
            </label>
            <input
              type="text"
              name="rating"
              placeholder="4.9"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
              App Size
            </label>
            <input
              type="text"
              name="size"
              placeholder="14 MB"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D]"
            />
          </div>
        </div>

        {/* Icon Upload Zone */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            App Icon
          </label>

          <input
            type="file"
            ref={fileInputRef}
            name="icon"
            accept="image/*"
            onChange={handleIconChange}
            className="hidden"
          />

          {formData.iconPreview ? (
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100 mx-auto">
              <img
                src={formData.iconPreview}
                alt="Icon Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 bg-white rounded text-slate-800"
                  title="Change"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleRemoveIcon}
                  className="p-1 bg-rose-600 text-white rounded"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-[#073E7D] hover:bg-blue-50/20 cursor-pointer transition flex flex-col items-center justify-center space-y-1 bg-slate-50"
            >
              <ImageIcon className="w-5 h-5 text-slate-400" />
              <p className="text-xs font-bold text-slate-600">
                Click to upload app logo
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
            className="px-4 py-2 bg-[#073E7D] text-white font-medium text-sm rounded-xl hover:bg-blue-900 shadow-md transition"
          >
            {itemData ? "Save Changes" : "Add Application"}
          </button>
        </div>
      </form>
    </MotherModal>
  );
}
