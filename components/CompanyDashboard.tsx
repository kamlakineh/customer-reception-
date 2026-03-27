"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Plus,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Printer
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import CustomerTable from "./CustomerTable";
import ReceptionFlow from "./ReceptionFlow";
import DoctorPanel from "./DoctorPanel";

export default function CompanyDashboard({ activeTab }: { activeTab: string }) {
  const { user, language } = useStore();
  const t = translations[language];
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = React.useCallback(async () => {
    if (!user?.companyId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/companies/${user.companyId}/stats`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to fetch stats" }));
        throw new Error(errorData.message || "Failed to fetch stats");
      }
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <div className="flex items-center justify-center h-full text-xs text-[var(--foreground)]">Loading...</div>;

  if (activeTab === "reception") {
    return <ReceptionFlow onUpdate={fetchStats} />;
  }

  if (activeTab === "doctor") {
    return <DoctorPanel onUpdate={fetchStats} />;
  }

  if (activeTab === "customers") {
    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h2 className="text-lg font-bold text-[var(--foreground)]">{t.customers}</h2>
        <div className="bg-[var(--background)] rounded-lg border border-[var(--border)] shadow-sm overflow-hidden">
          <CustomerTable companyId={user?.companyId!} onUpdate={fetchStats} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-[var(--foreground)]">{t.dashboard}</h2>
        <button 
          onClick={() => window.print()}
          className="print:hidden p-2 bg-[var(--background)] hover:bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--secondary-foreground)] rounded-lg transition-all border border-[var(--border)] shadow-sm flex items-center gap-2 text-xs font-bold"
        >
          <Printer size={16} />
          <span>Print Report</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-[var(--background)] rounded flex items-center justify-center text-[var(--foreground)]">
              <Users size={14} />
            </div>
            <p className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.total_customers}</p>
          </div>
          <h3 className="text-xl font-bold">{stats?.total || 0}</h3>
        </div>

        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-[var(--background)] rounded flex items-center justify-center text-[var(--foreground)]">
              <CheckCircle2 size={14} />
            </div>
            <p className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.arrived}</p>
          </div>
          <h3 className="text-xl font-bold">{stats?.arrived || 0}</h3>
        </div>

        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-[var(--background)] rounded flex items-center justify-center text-[var(--foreground)]">
              <Clock size={14} />
            </div>
            <p className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.not_arrived}</p>
          </div>
          <h3 className="text-xl font-bold">{stats?.notArrived || 0}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Arrived vs Not Arrived */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <PieIcon size={12} className="text-[var(--foreground)]" />
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.arrived_vs_not}</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.pieData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats?.pieData?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Week Trend (7 days) - Arrived Only */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarIcon size={12} className="text-[var(--foreground)]" />
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase">7-Day Arrived Trend</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.weekTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" fontSize={9} axisLine={false} tickLine={false} />
                <YAxis fontSize={9} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="arrived" fill="#22c55e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Month Trend (4 weeks) - Total, Arrived, Not Arrived */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarIcon size={12} className="text-[var(--foreground)]" />
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase">4-Week Trend (Total/Arr/Not)</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.monthTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="week" fontSize={9} axisLine={false} tickLine={false} />
                <YAxis fontSize={9} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="total" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="arrived" fill="#22c55e" radius={[2, 2, 0, 0]} />
                <Bar dataKey="notArrived" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: 3 Month Trend - Total, Arrived, Not Arrived */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarIcon size={12} className="text-[var(--foreground)]" />
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase">3-Month Trend (Total/Arr/Not)</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.threeMonthTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" fontSize={9} axisLine={false} tickLine={false} />
                <YAxis fontSize={9} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="total" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="arrived" fill="#22c55e" radius={[2, 2, 0, 0]} />
                <Bar dataKey="notArrived" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
