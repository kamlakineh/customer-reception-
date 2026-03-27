"use client";

import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React, { Suspense } from "react";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export default function Page() {
  const { user } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[var(--background)]" />;
  }

  if (!user) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-[var(--foreground)]">Loading...</div>}>
        <Login />
      </Suspense>
    );
  }

  return <Dashboard />;
}
