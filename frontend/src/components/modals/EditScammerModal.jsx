import React, { useState, useEffect, useRef } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";

export default function EditScammerModal({ onSaveSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);

  // Clean form state without reporter fields
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    location: "",
    details: "",
    selectedFile: null,
    photoPreview: "",
  });

  const fileInputRef = useRef(null);
  const modalId = "edit_scammer_modal";

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      setItemData(data);

      if (data) {
        setFormData({
          phone: data.phone || "",
          name: data.name || "",
          location: data.location || "",
          details: data.details || "",
          selectedFile: null,
          photoPreview: data.photo || "",
        });
      } else {
        resetForm();
      }
    });

    return () => unregister();
  }, []);

  const resetForm = () => {
    setFormData({
      phone: "",
      name: "",
      location: "",
      details: "",
      selectedFile: null,
      photoPreview: "",
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

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      selectedFile: file,
      photoPreview: URL.createObjectURL(file),
    }));
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      selectedFile: null,
      photoPreview: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Multipart FormData payload for API submission
    const payload = new FormData();
    if (itemData?.id) {
      payload.append("id", itemData.id);
    }
    payload.append("phone", formData.phone);
    payload.append("name", formData.name);
    payload.append("location", formData.location);
    payload.append("details", formData.details);

    if (formData.selectedFile) {
      payload.append("photo", formData.selectedFile);
    }

    if (onSaveSuccess) {
      onSaveSuccess({
        formDataPayload: payload,
        uiPreviewData: {
          id: itemData?.id || `scammer_${Date.now()}`,
          phone: formData.phone,
          name: formData.name,
          location: formData.location,
          details: formData.details,
          reportedAt: itemData?.reportedAt || "Just now",
          photo:
            formData.photoPreview ||
            "https://placehold.co/200x200/e2e8f0/64748b?text=No+Image",
        },
      });
    }

    handleClose();
  };

  return (
    <MotherModal
      isOpen={isOpen}
      onClose={handleClose}
      title={itemData ? "Edit Scammer Report" : "Report New Scammer"}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Scammer Phone & Name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              name="phone"
              placeholder="+8801800000000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
              Scammer Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D]"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Location / Address
          </label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Road 32, Mirpur, Dhaka"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D]"
          />
        </div>

        {/* Incident Details */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Incident Details <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            name="details"
            rows={3}
            placeholder="Provide details about the scam method or incident..."
            value={formData.details}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#073E7D] resize-none"
          />
        </div>

        {/* Photo Evidence Upload Zone */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Evidence / Scammer Photo
          </label>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          {formData.photoPreview ? (
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100 mx-auto">
              <img
                src={formData.photoPreview}
                alt="Evidence Preview"
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
                  onClick={handleRemovePhoto}
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
                Click to upload photo evidence
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
            {itemData ? "Save Changes" : "Submit Report"}
          </button>
        </div>
      </form>
    </MotherModal>
  );
}
