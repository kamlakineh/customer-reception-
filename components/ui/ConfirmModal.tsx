"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--background)]">
          <div className="flex items-center gap-2 text-[var(--foreground)]">
            <AlertTriangle size={18} />
            <h3 className="font-bold text-[var(--foreground)] text-sm">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-[var(--foreground)] hover:text-[var(--secondary-foreground)]">
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-4 bg-[var(--background)] border-t border-[var(--border)] flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-[var(--background)] text-[var(--foreground)] font-bold rounded-lg text-xs border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-[var(--secondary)] hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold rounded-lg text-xs transition-colors shadow-lg"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
