"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import {
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
  Moon,
  Sun,
  Languages,
  Stethoscope,
  ClipboardList,
  Settings
} from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import CompanyDashboard from "./CompanyDashboard";
import SettingsForm from "./SettingsForm";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user, language, theme, setLanguage, toggleTheme, logout } = useStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("dashboard");

  const isAdmin = user?.role === "ADMIN";

  const renderContent = () => {
    if (activeTab === "settings") {
      return <SettingsForm />;
    }

    return isAdmin ? (
      <AdminDashboard activeTab={activeTab} />
    ) : (
      <CompanyDashboard activeTab={activeTab} />
    );
  };

  const navItems = isAdmin
    ? [
      { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
      { id: "companies", label: t.companies, icon: Building2 },
      { id: "settings", label: t.settings, icon: Settings },
    ]
    : [
      { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
      { id: "reception", label: t.reception, icon: ClipboardList },
      { id: "doctor", label: t.doctor_panel, icon: Stethoscope },
      { id: "customers", label: t.customers, icon: Users },
      { id: "settings", label: t.settings, icon: Settings },
    ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Top Bar */}
      <header className="print:hidden h-14 border-b border-[var(--border)] flex items-center justify-between px-4 sticky top-0 bg-[var(--background)]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--secondary)] rounded flex items-center justify-center">
            <Building2 size={18} className="text-[var(--secondary-foreground)]" />
          </div>
          <span className="font-bold text-[var(--foreground)] text-sm hidden sm:inline-block">
            {isAdmin ? "Admin Portal" : user?.username.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            className="px-3 py-1.5 bg-[var(--background)] hover:bg-[var(--secondary)] rounded-lg transition-colors flex items-center gap-2 text-xs font-bold text-[var(--foreground)] border border-[var(--border)]"
          >
            <Languages size={14} />
            <span>{language === 'en' ? 'EN' : 'አማ'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 bg-[var(--background)] hover:bg-[var(--secondary)] rounded-lg transition-colors text-[var(--foreground)] border border-[var(--border)]"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <div className="h-6 w-px bg-[var(--background)] mx-1" />

          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] rounded-md transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">{t.logout}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="print:hidden w-16 sm:w-48 border-r border-[var(--border)] flex flex-col p-2 gap-1 overflow-y-auto bg-blue-500">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium",
                activeTab === item.id
                  ? "bg-[var(--background)] text-[var(--foreground)]  "
                  : "text-[var(--foreground)]  hover:bg-[var(--secondary)] "
              )}
            >
              <item.icon size={18} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
