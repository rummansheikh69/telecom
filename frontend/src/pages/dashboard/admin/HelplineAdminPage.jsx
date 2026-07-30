import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  Edit,
  Building2,
  Smartphone,
  CreditCard,
  Banknote,
  PiggyBank,
  Package,
  UserCheck,
  Globe,
  Landmark,
} from "lucide-react";
import { globalModal } from "../../../components/modals/modalManager";
import EditHelplineModal from "../../../components/modals/EditHelplineModal";
import DeleteHelplineModal from "../../../components/modals/DeleteHelplineModal";
import AdminLayout from "../../../components/layout/AdminLayout";

const CATEGORIES = [
  { name: "Bank", icon: Building2 },
  { name: "SIM Operators", icon: Smartphone },
  { name: "SIM balance", icon: CreditCard },
  { name: "MFS", icon: Banknote },
  { name: "SIM Loan", icon: PiggyBank },
  { name: "SIM Package", icon: Package },
  { name: "Our Officer", icon: UserCheck },
  { name: "Phone code", icon: Globe },
  { name: "Govt", icon: Landmark },
];

const INITIAL_DIRECTORY_DATA = {
  Bank: [
    {
      id: "b1",
      title: "Brac Bank",
      code: "16221",
      note: "24/7 Call Center",
      icon: "🏛️",
    },
    {
      id: "b2",
      title: "Dutch-Bangla Bank",
      code: "16216",
      note: "Cards & Support",
      icon: "🏛️",
    },
  ],
  "SIM Operators": [
    {
      id: "so1",
      title: "Grameenphone",
      code: "121",
      note: "Customer Care Hotline",
      icon: "📱",
    },
  ],
  "SIM balance": [
    {
      id: "sb1",
      title: "Grameenphone Balance",
      code: "*566#",
      note: "Main Balance Check",
      icon: "💳",
    },
  ],
  MFS: [
    {
      id: "mfs1",
      title: "bKash",
      code: "16247",
      note: "24/7 Helpline | Menu: *247#",
      icon: "💸",
    },
  ],
  "SIM Loan": [
    {
      id: "sl1",
      title: "GP Emergency Balance",
      code: "*1010#",
      note: "Advance Balance Loan",
      icon: "💰",
    },
  ],
  "SIM Package": [
    {
      id: "sp1",
      title: "GP Internet Offers",
      code: "*121*3#",
      note: "Internet & MB Offers",
      icon: "📦",
    },
  ],
  "Our Officer": [
    {
      id: "oo1",
      title: "Main Operations Desk",
      code: "01700000000",
      note: "Platform Administration",
      icon: "👨‍💼",
    },
  ],
  "Phone code": [
    {
      id: "pc1",
      title: "Own Number Check (GP)",
      code: "*2#",
      note: "Check GP SIM Number",
      icon: "🌐",
    },
  ],
  Govt: [
    {
      id: "g1",
      title: "National Emergency Service",
      code: "999",
      note: "Police, Fire & Ambulance",
      icon: "🏛️",
    },
  ],
};

export default function HelplineAdminPage({ userRole = "ceo" }) {
  const [directory, setDirectory] = useState(INITIAL_DIRECTORY_DATA);
  const [selectedCategory, setSelectedCategory] = useState("Bank");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    const list = directory[selectedCategory] || [];
    if (!searchQuery.trim()) return list;

    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.note.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [directory, selectedCategory, searchQuery]);

  // Handle Save (Add or Update)
  const handleSaveEntry = (savedItem) => {
    setDirectory((prev) => {
      const newDir = { ...prev };

      // Handle category change during edit
      if (
        savedItem.oldCategory &&
        savedItem.oldCategory !== savedItem.category
      ) {
        newDir[savedItem.oldCategory] = (
          newDir[savedItem.oldCategory] || []
        ).filter((i) => i.id !== savedItem.id);
      }

      const targetList = newDir[savedItem.category] || [];
      const existsIndex = targetList.findIndex((i) => i.id === savedItem.id);

      if (existsIndex > -1) {
        targetList[existsIndex] = savedItem;
      } else {
        targetList.push(savedItem);
      }

      newDir[savedItem.category] = [...targetList];
      return newDir;
    });
  };

  // Handle Delete
  const handleDeleteEntry = (id, category) => {
    setDirectory((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((item) => item.id !== id),
    }));
  };

  return (
    <AdminLayout userRole={userRole}>
      <div className="space-y-4 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-slate-800">
              Helpline Manager
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage USSD codes and contact numbers.
            </p>
          </div>
          <button
            onClick={() =>
              globalModal.open("edit_helpline_modal", {
                category: selectedCategory,
              })
            }
            className="flex items-center gap-1.5 px-3 py-2 bg-secondary text-white rounded-xl text-xs font-bold shadow hover:bg-blue-900 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        </div>

        {/* Locked Category Tabs */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-2 shadow-sm overflow-x-auto no-scrollbar">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-secondary text-white shadow-md shadow-blue-900/10"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={`Search in ${selectedCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-secondary shadow-sm"
          />
        </div>

        {/* Item List */}
        <div className="space-y-2.5">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex items-center justify-between gap-3 hover:border-blue-100 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shrink-0">
                    {item.icon || "📞"}
                  </div>
                  <div className="truncate">
                    <h3 className="text-xs font-bold text-slate-800 truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                      {item.note}
                    </p>
                    <span className="inline-block mt-1 text-xs font-mono font-extrabold text-secondary bg-blue-50 px-2 py-0.5 rounded">
                      {item.code}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() =>
                      globalModal.open("edit_helpline_modal", {
                        ...item,
                        category: selectedCategory,
                      })
                    }
                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title="Edit Entry"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      globalModal.open("delete_helpline_modal", {
                        ...item,
                        category: selectedCategory,
                      })
                    }
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-2">
              <p className="text-xs font-bold text-slate-600">
                No Entries Found in {selectedCategory}
              </p>
            </div>
          )}
        </div>

        {/* Global Modals Mounted */}
        <EditHelplineModal onSaveSuccess={handleSaveEntry} />
        <DeleteHelplineModal onDeleteSuccess={handleDeleteEntry} />
      </div>
    </AdminLayout>
  );
}
