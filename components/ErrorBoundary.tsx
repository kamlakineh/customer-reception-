"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
          <div className="max-w-md w-full bg-[var(--background)] rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-[var(--background)] rounded-full flex items-center justify-center text-[var(--foreground)] mx-auto mb-6">
                <AlertCircle size={32} />
              </div>
              <h1 className="text-xl font-bold text-[var(--foreground)] mb-2">Something went wrong</h1>
              <p className="text-sm text-[var(--foreground)] mb-8 leading-relaxed">
                An unexpected error occurred. We&apos;ve been notified and are working to fix it.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-[var(--secondary)] hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} />
                Reload Application
              </button>
              
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 p-4 bg-[var(--background)] rounded-lg text-left overflow-auto max-h-48">
                  <p className="text-[10px] font-mono text-[var(--foreground)] whitespace-pre-wrap">
                    {this.state.error?.stack}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
