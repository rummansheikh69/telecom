import React, { useState, useMemo } from "react";
import {
  PhoneCall,
  Search,
  Copy,
  Check,
  Building2,
  Smartphone,
  CreditCard,
  Banknote,
  PiggyBank,
  Package,
  UserCheck,
  Globe,
  Landmark,
  ExternalLink,
} from "lucide-react";
import PageTitle from "../components/layout/PageTitle";

// Directory Dataset containing 9 specific categories
const DIRECTORY_DATA = {
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
    {
      id: "b3",
      title: "Islami Bank Bangladesh",
      code: "16259",
      note: "Customer Help",
      icon: "🏛️",
    },
    {
      id: "b4",
      title: "City Bank",
      code: "16234",
      note: "CityTouch Support",
      icon: "🏛️",
    },
    {
      id: "b5",
      title: "EBL (Eastern Bank)",
      code: "16230",
      note: "24-Hour Hotline",
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
    { id: "so2", title: "Robi", code: "123", note: "Helpline", icon: "📱" },
    {
      id: "so3",
      title: "Banglalink",
      code: "121",
      note: "Customer Service",
      icon: "📱",
    },
    { id: "so4", title: "Airtel", code: "786", note: "Helpline", icon: "📱" },
    {
      id: "so5",
      title: "Teletalk",
      code: "121",
      note: "Customer Support",
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
    {
      id: "sb2",
      title: "Robi Balance",
      code: "*222#",
      note: "Main Balance Check",
      icon: "💳",
    },
    {
      id: "sb3",
      title: "Banglalink Balance",
      code: "*124#",
      note: "Main Balance Check",
      icon: "💳",
    },
    {
      id: "sb4",
      title: "Airtel Balance",
      code: "*778#",
      note: "Main Balance Check",
      icon: "💳",
    },
    {
      id: "sb5",
      title: "Teletalk Balance",
      code: "*152#",
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
    {
      id: "mfs2",
      title: "Nagad",
      code: "16167",
      note: "Customer Support | Menu: *167#",
      icon: "💸",
    },
    {
      id: "mfs3",
      title: "Rocket",
      code: "16216",
      note: "DBBL Mobile Banking | Menu: *322#",
      icon: "💸",
    },
    {
      id: "mfs4",
      title: "Upay",
      code: "16268",
      note: "UCB MFS | Menu: *268#",
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
    {
      id: "sl2",
      title: "Robi Emergency Loan",
      code: "*8#",
      note: "Advance Balance",
      icon: "💰",
    },
    {
      id: "sl3",
      title: "Banglalink Emergency",
      code: "*874#",
      note: "Emergency Loan Menu",
      icon: "💰",
    },
    {
      id: "sl4",
      title: "Airtel Loan",
      code: "*8#",
      note: "Emergency Balance",
      icon: "💰",
    },
    {
      id: "sl5",
      title: "Teletalk Loan",
      code: "*1122#",
      note: "Emergency Advance",
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
    {
      id: "sp2",
      title: "Robi Bundle Offers",
      code: "*0#",
      note: "Best Value Packs",
      icon: "📦",
    },
    {
      id: "sp3",
      title: "Banglalink Special Packs",
      code: "*888#",
      note: "Special Offer Menu",
      icon: "📦",
    },
    {
      id: "sp4",
      title: "Airtel Internet Offers",
      code: "*4#",
      note: "Data Packs",
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
    {
      id: "oo2",
      title: "P2P Dispute Resolution",
      code: "01800000000",
      note: "Trade & Payment Issues",
      icon: "👨‍💼",
    },
    {
      id: "oo3",
      title: "Technical Support Officer",
      code: "01900000000",
      note: "App & Account Help",
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
    {
      id: "pc2",
      title: "Own Number Check (Robi)",
      code: "*140*2*4#",
      note: "Check Robi Number",
      icon: "🌐",
    },
    {
      id: "pc3",
      title: "Own Number Check (BL)",
      code: "*511#",
      note: "Check Banglalink Number",
      icon: "🌐",
    },
    {
      id: "pc4",
      title: "Own Number Check (Airtel)",
      code: "*2#",
      note: "Check Airtel Number",
      icon: "🌐",
    },
    {
      id: "pc5",
      title: "Own Number Check (Teletalk)",
      code: "*551#",
      note: "Check Teletalk Number",
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
    {
      id: "g2",
      title: "Government Info Helpline",
      code: "333",
      note: "Information & Services",
      icon: "🏛️",
    },
    {
      id: "g3",
      title: "Child Helpline",
      code: "1098",
      note: "Child Protection & Rights",
      icon: "🏛️",
    },
    {
      id: "g3",
      title: "Child Helpline",
      code: "1098",
      note: "Child Protection & Rights",
      icon: "🏛️",
    },
    {
      id: "g3",
      title: "Child Helpline",
      code: "1098",
      note: "Child Protection & Rights",
      icon: "🏛️",
    },
    {
      id: "g3",
      title: "Child Helpline",
      code: "1098",
      note: "Child Protection & Rights",
      icon: "🏛️",
    },
    {
      id: "g3",
      title: "Child Helpline",
      code: "1098",
      note: "Child Protection & Rights",
      icon: "🏛️",
    },
    {
      id: "g4",
      title: "Cyber Crime Helpline",
      code: "01769691509",
      note: "Police Cyber Support",
      icon: "🏛️",
    },
  ],
};

// Registered Categories List with dynamic icons
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

export default function HelplinePage() {
  const [selectedCategory, setSelectedCategory] = useState("Bank");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Filter numbers based on selected category & search input
  const filteredItems = useMemo(() => {
    const list = DIRECTORY_DATA[selectedCategory] || [];
    if (!searchQuery.trim()) return list;

    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.note.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [selectedCategory, searchQuery]);

  // Handle clipboard copy logic
  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-main font-sans pb-16">
      {/* Top Bar Navigation */}
      <PageTitle link="/" title="Helpline & USSD Directory" />

      {/* Main Container */}
      <div className="max-w-md mx-auto space-y-4 pt-2">
        {/* CATEGORIES HORIZONTAL SCROLLBAR */}
        <div className="bg-white border-b border-slate-200/80 shadow-sm py-3 px-2 sticky top-[57px] z-20">
          <div className="grid grid-cols-3 gap-2  px-2">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSearchQuery(""); // reset search on tab change
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isSelected
                      ? "bg-[#073E7D] text-white shadow-md shadow-blue-900/10 scale-[1.02]"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  <IconComp
                    className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-500"}`}
                  />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 space-y-3">
          {/* SEARCH FILTER FIELD */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search in ${selectedCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#073E7D] shadow-sm"
            />
          </div>

          {/* ACTIVE CATEGORY HEADER BANNER */}
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {selectedCategory} Directory ({filteredItems.length})
            </h2>
          </div>

          {/* NUMBERS & CODES DIRECTORY CARDS */}
          <div className="space-y-2.5">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-3 hover:border-blue-100 transition"
                >
                  {/* Left: Icon & Title Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <h3 className="text-sm font-bold text-slate-800 truncate">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                        {item.note}
                      </p>
                      <span className="inline-block mt-1 text-xs font-mono font-extrabold text-[#073E7D] bg-blue-50 px-2 py-0.5 rounded">
                        {item.code}
                      </span>
                    </div>
                  </div>

                  {/* Right: One-Tap Actions (Copy & Call) */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Copy Code Button */}
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.code)}
                      title="Copy code"
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-500 hover:bg-slate-100 transition"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Direct Tel Call Button */}
                    <a
                      href={`tel:${item.code.replace(/#/g, "%23")}`}
                      className="p-2.5 rounded-xl bg-[#073E7D] text-white hover:bg-blue-900 transition shadow-sm flex items-center justify-center"
                      title="Call Helpline"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              /* Empty Search Result Fallback */
              <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center space-y-2">
                <p className="text-2xl">🔍</p>
                <p className="text-sm font-bold text-slate-700">
                  No entries found
                </p>
                <p className="text-xs text-slate-400">
                  Try searching for a different number or code in{" "}
                  {selectedCategory}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
