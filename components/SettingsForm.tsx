"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { Lock, CheckCircle2, AlertCircle } from "lucide-react";

export default function SettingsForm() {
  const { user, language } = useStore();
  const t = translations[language];
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: t.passwords_not_match });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: user?.id, 
          role: user?.role,
          newPassword 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: t.password_updated });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: 'error', text: data.message || "Failed to update password" });
      }
    } catch (err) {
      setMessage({ type: 'error', text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-[var(--background)] rounded-lg text-[var(--foreground)]">
              <Lock size={20} />
            </div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">{t.change_password}</h2>
          </div>
          <p className="text-xs text-[var(--foreground)]">Update your account security settings</p>
        </div>

        <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
          {message && (
            <div className={`p-3 rounded-lg flex items-center gap-3 text-xs font-medium ${
              message.type === 'success' 
                ? 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]   ' 
                : 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]   '
            }`}>
              {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
              {t.new_password}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-2 ring-[var(--border)] outline-none transition-all text-sm"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
              {t.confirm_password}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-2 ring-[var(--border)] outline-none transition-all text-sm"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--secondary)] hover:bg-[var(--secondary)] disabled:opacity-50 text-[var(--secondary-foreground)] font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[var(--border)]/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={18} />
                {t.update_password}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
