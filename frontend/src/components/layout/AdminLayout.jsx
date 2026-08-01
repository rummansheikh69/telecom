import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  LayoutDashboard,
  Users,
  CreditCard,
  ShoppingBag,
  Smartphone,
  SlidersHorizontal,
  ShieldAlert,
  Settings,
  LogOut,
  Ad,
  PhoneCall,
  Newspaper,
} from "lucide-react";
import { PiAppStoreLogo } from "react-icons/pi";
import { LiaUserNinjaSolid } from "react-icons/lia";

// Master list of navigation items with allowed roles specified
const ALL_NAV_ITEMS = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["ceo", "admin", "moderator", "support"],
  },
  {
    path: "/users",
    label: "User Management",
    icon: Users,
    roles: ["ceo", "admin"],
  },
  {
    path: "/apps-admin",
    label: "App Store",
    icon: PiAppStoreLogo,
    roles: ["ceo", "admin", "moderator"],
  },
  {
    path: "/helpline-admin",
    label: "Helpline Management",
    icon: PhoneCall,
    roles: ["ceo", "admin", "moderator"],
  },
  {
    path: "/topup-logs",
    label: "Topup & Telecom",
    icon: Smartphone,
    roles: ["ceo", "admin", "support"],
  },
  {
    path: "/promo",
    label: "Promotions & Banner",
    icon: Ad,
    roles: ["ceo"],
  },
  {
    path: "/scammers-admin",
    label: "Scammer Management",
    icon: LiaUserNinjaSolid,
    roles: ["ceo"],
  },
  {
    path: "/updates-admin",
    label: "Updates & Announcements",
    icon: Newspaper,
    roles: ["ceo", "admin", "moderator"],
  },
  {
    path: "/settings",
    label: "System Settings",
    icon: Settings,
    roles: ["ceo"],
  },
];

export default function AdminLayout({ userRole = "ceo", children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter items dynamically according to the user's current role
  const navItems = ALL_NAV_ITEMS.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    // Outer viewport container - Centering the mobile shell
    <div className="min-h-screen bg-slate-900 flex justify-center items-center font-sans antialiased">
      {/* FIXED MOBILE FRAME SHELL CONTAINER (Max-Width md) */}
      <div className="w-full max-w-md h-screen bg-main shadow-2xl overflow-hidden flex relative ">
        {/* ========================================================= */}
        {/* BACKDROP OVERLAY (SCOPED WITHIN MOBILE FRAME ONLY)        */}
        {/* ========================================================= */}
        <div
          onClick={() => setIsExpanded(false)}
          className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-30 transition-opacity duration-300 ${
            isExpanded
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />

        {/* ========================================================= */}
        {/* SINGLE EXPANDABLE SIDEBAR (Expands seamlessly in-place)    */}
        {/* ========================================================= */}
        <aside
          className={`bg-main text-textPrimary pb-14 flex flex-col border-r border-border shrink-0 z-40 transition-all duration-300 ease-in-out ${
            isExpanded ? "w-56 shadow-2xl" : "w-14"
          }`}
        >
          {/* Top Toggle Button */}
          <div
            className={`h-14 flex items-center shrink-0 ${isExpanded ? "px-3 justify-between" : "justify-center"}`}
          >
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-black/10 hover:bg-black/20 active:scale-95 transition"
              title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isExpanded ? (
                <X className="w-5 h-5 text-black" />
              ) : (
                <Menu className="w-5 h-5 text-black" />
              )}
            </button>

            {isExpanded && (
              <span className="text-xs font-bold uppercase tracking-wider text-textGry truncate pr-2">
                Control Menu
              </span>
            )}
          </div>

          {/* Dynamic Role-Filtered Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1.5 no-scrollbar">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsExpanded(false)}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl transition-all h-10 ${
                      isExpanded ? "px-3 gap-3" : "justify-center"
                    } ${
                      isActive
                        ? "bg-secondary text-white font-bold shadow-md"
                        : "text-textPrimary hover:bg-black/10"
                    }`
                  }
                  title={!isExpanded ? item.label : undefined}
                >
                  <IconComp className="w-5 h-5 shrink-0" />
                  {isExpanded && (
                    <span className="text-xs font-semibold truncate">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer Logout */}
          <div className="p-2  shrink-0">
            <button
              type="button"
              className={`w-full flex items-center rounded-xl hover:bg-black/10 text-textPrimary hover:text-textPrimary/80 transition h-10 ${
                isExpanded ? "px-3 gap-3" : "justify-center"
              }`}
              title={!isExpanded ? "Sign Out" : undefined}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {isExpanded && (
                <span className="text-xs font-semibold truncate">Sign Out</span>
              )}
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT MAIN CONTENT AREA                                   */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
          {/* Header Bar */}
          <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs tracking-wider text-slate-800 uppercase">
                Control Panel
              </span>
            </div>

            <button
              type="button"
              className="relative p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-4 space-y-4">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}
