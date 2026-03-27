"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { LogIn, Moon, Sun, Languages } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, language, theme, setLanguage, toggleTheme } = useStore();
  const t = translations[language];

  useEffect(() => {
    const u = searchParams.get("u");
    if (u) setUsername(u);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        const data = await res.json().catch(() => ({ message: "Server error" }));
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Top Bar for Login */}
      <header className="h-14 flex items-center justify-end px-4 gap-3">
        <button
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
          className="px-3 py-1.5 bg-[var(--background)] hover:bg-[var(--secondary)] rounded-lg transition-colors flex items-center gap-2 text-xs font-bold text-[var(--foreground)] border border-[var(--border)] shadow-sm"
        >
          <Languages size={14} />
          <span>{language === 'en' ? 'EN' : 'አማ'}</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 bg-[var(--background)] hover:bg-[var(--secondary)] rounded-lg transition-colors text-[var(--foreground)] border border-[var(--border)] shadow-sm"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[var(--background)] rounded-xl shadow-lg p-8 border border-[var(--border)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-[var(--secondary)] rounded-lg flex items-center justify-center mb-4">
              <LogIn className="text-[var(--secondary-foreground)]" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{t.login}</h1>
            <p className="text-[var(--foreground)] text-sm mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                {t.username}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg outline-none focus:ring-2 focus:ring-2 ring-[var(--border)] text-sm"
                placeholder="admin or company_user"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg outline-none focus:ring-2 focus:ring-2 ring-[var(--border)] text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-[var(--foreground)] text-xs italic">{error}</p>}

            <button type="submit" className="w-full py-2.5 bg-[var(--secondary)] hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold rounded-lg transition-all shadow-sm active:scale-[0.98] mt-4">
              {t.login}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-xs text-[var(--foreground)]">
              Contact admin for credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
