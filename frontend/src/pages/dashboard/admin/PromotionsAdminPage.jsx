import React, { useState } from "react";
import { globalModal } from "../../../components/modals/modalManager";
import { Plus, Trash2, Edit, Image as ImageIcon, Sparkles } from "lucide-react";
import DeletePromotionModal from "../../../components/modals/DeletePromotionModal";
import EditPromotionModal from "../../../components/modals/EditPromotionModal";
import AdminLayout from "../../../components/layout/AdminLayout";

const INITIAL_PROMOTIONS = [
  {
    id: 1,
    bgImage:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80",
    link: "/promotions/cashback",
    title: "Cashback Offer",
  },
  {
    id: 2,
    bgImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    link: "/promotions/referral",
    title: "Referral Bonus",
  },
  {
    id: 3,
    bgImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    link: null,
    title: "Special Campaign (No Button)",
  },
];

export default function PromotionsAdminPage({ userRole = "ceo" }) {
  const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);

  const handleSavePromotion = (savedPromo) => {
    setPromotions((prev) => {
      const exists = prev.some((p) => p.id === savedPromo.id);
      if (exists) {
        return prev.map((p) => (p.id === savedPromo.id ? savedPromo : p));
      }
      return [...prev, savedPromo];
    });
  };

  const handleDeletePromotion = (id) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminLayout userRole={userRole}>
      <div className="space-y-4 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-slate-800">
              Promotions Manager
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage user app carousel banners.
            </p>
          </div>
          <button
            onClick={() => globalModal.open("edit_promotion_modal", null)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#073E7D] text-white rounded-xl text-xs font-bold shadow hover:bg-blue-900 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Banner</span>
          </button>
        </div>

        {/* Promotions List */}
        <div className="space-y-3">
          {promotions.map((promo, index) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm space-y-3"
            >
              <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900 flex flex-col justify-between p-3">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${promo.bgImage})` }}
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white border border-white/20">
                    Slide #{index + 1}
                  </span>
                  {promo.link ? (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Action Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-300 bg-slate-950/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-700">
                      No Action Button
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate max-w-[180px]">
                    {promo.title || "Untitled Banner"}
                  </span>
                  {promo.link && (
                    <span className="bg-white text-slate-900 px-3 py-1 rounded-lg text-[10px] font-bold shadow">
                      View
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-slate-400 font-mono truncate pr-2">
                  Link: {promo.link || "None"}
                </p>

                {/* Global Modal Triggers */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() =>
                      globalModal.open("edit_promotion_modal", promo)
                    }
                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Edit Banner"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      globalModal.open("delete_promotion_modal", promo)
                    }
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                    title="Delete Banner"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {promotions.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-2">
              <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-600">
                No Banners Available
              </p>
            </div>
          )}
        </div>

        {/* Global Modals Mounted at Page Level */}
        <DeletePromotionModal onDeleteSuccess={handleDeletePromotion} />
        <EditPromotionModal onSaveSuccess={handleSavePromotion} />
      </div>
    </AdminLayout>
  );
}
