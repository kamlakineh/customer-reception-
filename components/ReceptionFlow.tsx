"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { UserPlus, CheckCircle } from "lucide-react";

export default function ReceptionFlow({ onUpdate }: { onUpdate: () => void }) {
  const { user, language } = useStore();
  const t = translations[language];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          companyId: user?.companyId,
          status: "NOT_ARRIVED"
        }),
      });
      setName("");
      setPhone("");
      onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-[var(--foreground)]">{t.reception}</h2>
      
      <div className="max-w-sm bg-[var(--background)] p-4 rounded-lg border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[var(--background)] rounded flex items-center justify-center text-[var(--foreground)]">
            <UserPlus size={14} />
          </div>
          <h3 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">{t.add_customer}</h3>
        </div>

        <form onSubmit={handleAdd} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-[var(--foreground)] uppercase mb-1">{t.name}</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg outline-none focus:ring-2 focus:ring-2 ring-[var(--border)] text-sm" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[var(--foreground)] uppercase mb-1">{t.phone}</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg outline-none focus:ring-2 focus:ring-2 ring-[var(--border)] text-sm" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 bg-[var(--secondary)] hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold rounded-lg transition-all shadow-sm active:scale-[0.98] text-xs flex items-center justify-center gap-2"
          >
            {loading ? "Adding..." : t.add_customer}
          </button>
        </form>
      </div>
    </div>
  );
}
