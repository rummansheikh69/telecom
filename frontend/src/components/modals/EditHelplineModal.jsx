import React, { useState, useEffect } from "react";
import { globalModal } from "./modalManager";
import { MotherModal } from "./MotherModal";

const CATEGORY_OPTIONS = [
  "Bank",
  "SIM Operators",
  "SIM balance",
  "MFS",
  "SIM Loan",
  "SIM Package",
  "Our Officer",
  "Phone code",
  "Govt",
];

export default function EditHelplineModal({ onSaveSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [formData, setFormData] = useState({
    category: "Bank",
    title: "",
    code: "",
    note: "",
    icon: "📞",
  });

  const modalId = "edit_helpline_modal";

  useEffect(() => {
    const unregister = globalModal.register(modalId, (openState, data) => {
      setIsOpen(openState);
      setItemData(data);
      if (data) {
        setFormData({
          category: data.category || "Bank",
          title: data.title || "",
          code: data.code || "",
          note: data.note || "",
          icon: data.icon || "📞",
        });
      } else {
        setFormData({
          category: "Bank",
          title: "",
          code: "",
          note: "",
          icon: "📞",
        });
      }
    });

    return () => unregister();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setItemData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: itemData?.id || `hl_${Date.now()}`,
      category: formData.category,
      title: formData.title,
      code: formData.code,
      note: formData.note,
      icon: formData.icon,
      oldCategory: itemData?.category, // Track if category changed during edit
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
      title={itemData ? "Edit Directory Entry" : "Add New Helpline Entry"}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Category Selector (Required) */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-secondary"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Title / Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Brac Bank Helpline"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Code / Phone Number / USSD */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Code / Number / USSD <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 16221 or *566#"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Short Note */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Short Description / Note
          </label>
          <input
            type="text"
            placeholder="e.g. 24/7 Call Center"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Emoji Icon */}
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Icon (Emoji)
          </label>
          <input
            type="text"
            placeholder="🏛️, 📱, 💳, 💸..."
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Action Buttons */}
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
            {itemData ? "Save Changes" : "Create Entry"}
          </button>
        </div>
      </form>
    </MotherModal>
  );
}
