"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="text-[var(--foreground)]" size={18} />,
    error: <AlertCircle className="text-[var(--foreground)]" size={18} />,
    info: <CheckCircle2 className="text-[var(--foreground)]" size={18} />,
  };

  const bgColors = {
    success: "bg-[var(--background)]  border-[var(--border)]  text-[var(--foreground)] ",
    error: "bg-[var(--background)]  border-[var(--border)]  text-[var(--foreground)] ",
    info: "bg-[var(--background)]  border-[var(--border)]  text-[var(--foreground)] ",
  };

  return (
    <div className={cn(
      "toast border",
      bgColors[type]
    )}>
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-[var(--foreground)] hover:text-[var(--secondary-foreground)]">
        <X size={14} />
      </button>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );

  return { showToast, ToastContainer };
}
