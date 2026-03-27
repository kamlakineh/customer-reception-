"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { 
  Users, 
  Building2, 
  Share2, 
  TrendingUp, 
  ArrowUpRight,
  Eye,
  Lock,
  User,
  ExternalLink,
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  CheckCircle2,
  AlertCircle,
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
import { ConfirmModal } from "./ui/ConfirmModal";
import { useToast } from "./ui/Toast";

export default function AdminDashboard({ activeTab }: { activeTab: string }) {
  const { language } = useStore();
  const t = translations[language];
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState({ id: '', name: '', username: '', password: '' });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const { showToast, ToastContainer } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, id: string } | null>(null);

  const fetchCompanies = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/companies");
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to fetch companies" }));
        throw new Error(errorData.message || "Failed to fetch companies");
      }
      const data = await res.json();
      setCompanies(data);
    } catch (err: any) {
      console.error(err);
      // You could add a toast notification here if available
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    // Reset selected company when switching tabs
    setSelectedCompany(null);
    setSearchTerm("");
  }, [activeTab]);

  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData({ id: '', name: '', username: '', password: '' });
    setModalMessage(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (company: any) => {
    setModalMode('edit');
    setFormData({ 
      id: company.id, 
      name: company.name, 
      username: company.username, 
      password: company.plainPassword || '' 
    });
    setModalMessage(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalMessage(null);

    try {
      const url = modalMode === 'add' ? '/api/companies' : `/api/companies/${formData.id}`;
      const method = modalMode === 'add' ? 'POST' : 'PATCH';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Operation failed" }));
        throw new Error(errorData.message || "Operation failed");
      }

      setModalMessage({ type: 'success', text: modalMode === 'add' ? "Company added!" : "Company updated!" });
      fetchCompanies();
      setTimeout(() => setShowModal(false), 1500);
    } catch (err: any) {
      setModalMessage({ type: 'error', text: err.message });
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(`/api/companies/${deleteConfirm.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Company deleted successfully", "success");
      fetchCompanies();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete company", "error");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleShare = (company: any) => {
    const text = `Company: ${company.name}\nURL: ${window.location.origin}\nUsername: ${company.username}\nPassword: ${company.plainPassword}`;
    navigator.clipboard.writeText(text);
    showToast(t.credentials_copied, "success");
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = companies.reduce((acc, company) => {
    const stats = company.stats;
    
    // Aggregate Pie Data
    acc.arrived += stats.arrived;
    acc.notArrived += stats.notArrived;

    // Aggregate Week Trend
    stats.weekTrend.forEach((dayData: any, i: number) => {
      if (!acc.weekTrend[i]) acc.weekTrend[i] = { day: dayData.day, arrived: 0 };
      acc.weekTrend[i].arrived += dayData.arrived;
    });

    // Aggregate Month Trend
    stats.monthTrend.forEach((weekData: any, i: number) => {
      if (!acc.monthTrend[i]) acc.monthTrend[i] = { week: weekData.week, total: 0, arrived: 0, notArrived: 0 };
      acc.monthTrend[i].total += weekData.total;
      acc.monthTrend[i].arrived += weekData.arrived;
      acc.monthTrend[i].notArrived += weekData.notArrived;
    });

    // Aggregate 3 Month Trend
    stats.threeMonthTrend.forEach((monthData: any, i: number) => {
      if (!acc.threeMonthTrend[i]) acc.threeMonthTrend[i] = { month: monthData.month, total: 0, arrived: 0, notArrived: 0 };
      acc.threeMonthTrend[i].total += monthData.total;
      acc.threeMonthTrend[i].arrived += monthData.arrived;
      acc.threeMonthTrend[i].notArrived += monthData.notArrived;
    });

    return acc;
  }, { 
    arrived: 0, 
    notArrived: 0, 
    weekTrend: [] as any[], 
    monthTrend: [] as any[], 
    threeMonthTrend: [] as any[] 
  });

  const aggregatePieData = [
    { name: "Arrived", value: totalStats.arrived, color: "#22c55e" },
    { name: "Not Arrived", value: totalStats.notArrived, color: "#ef4444" },
  ];

  if (loading) return <div className="flex items-center justify-center h-full text-xs text-[var(--foreground)]">Loading...</div>;

  if (selectedCompany) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex items-center justify-between mb-4 mt-2">
          <button 
            onClick={() => setSelectedCompany(null)}
            className="text-xs font-bold text-[var(--foreground)] hover:underline flex items-center gap-1 print:hidden"
          >
            ← {t.companies}
          </button>
          <div className="flex items-center gap-4 text-right">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)] leading-tight">{selectedCompany.name}</h2>
              <p className="text-[10px] text-[var(--foreground)] uppercase tracking-widest font-bold">{t.analytics}</p>
            </div>
            <button 
              onClick={() => window.print()}
              className="print:hidden p-2 bg-[var(--background)] hover:bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--secondary-foreground)] rounded-lg transition-all border border-[var(--border)] shadow-sm flex items-center gap-2 text-xs font-bold"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chart 1: Arrived vs Not Arrived */}
          <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-3">{t.arrived_vs_not}</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedCompany.stats.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {selectedCompany.stats.pieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Week Trend */}
          <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-3">7-Day Arrived Trend</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedCompany.stats.weekTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" fontSize={9} axisLine={false} tickLine={false} />
                  <YAxis fontSize={9} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="arrived" fill="#22c55e" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Month Trend */}
          <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-3">4-Week Trend (Total/Arr/Not)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedCompany.stats.monthTrend}>
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

          {/* Chart 4: 3 Month Trend */}
          <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-3">3-Month Trend (Total/Arr/Not)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedCompany.stats.threeMonthTrend}>
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

        <div className="bg-[var(--background)] rounded-lg border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--background)]">
            <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.customers} (Read Only)</h3>
          </div>
          <CustomerTable companyId={selectedCompany.id} readOnly={true} />
        </div>
      </div>
    );
  }

  if (activeTab === "companies") {
    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <h2 className="text-lg font-bold text-[var(--foreground)]">{t.companies}</h2>
            <button 
              onClick={handleOpenAddModal}
              className="p-1.5 bg-[var(--secondary)] hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-lg transition-all shadow-sm flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
            >
              <Plus size={14} />
              <span>{t.add_company}</span>
            </button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]" />
            <input
              type="text"
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-2 ring-[var(--border)] outline-none transition-all text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCompanies.map((company) => (
            <div 
              key={company.id}
              className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm hover:border-[var(--border)] transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 bg-[var(--background)] rounded flex items-center justify-center text-[var(--foreground)]">
                  <Building2 size={16} />
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleShare(company)}
                    title={t.share_credentials}
                    className="p-1.5 text-[var(--foreground)] hover:text-[var(--secondary-foreground)] rounded transition-colors"
                  >
                    <Share2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleOpenEditModal(company)}
                    title={t.edit}
                    className="p-1.5 text-[var(--foreground)] hover:text-[var(--secondary-foreground)] rounded transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(company.id)}
                    title={t.delete}
                    className="p-1.5 text-[var(--foreground)] hover:text-[var(--secondary-foreground)] rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button 
                    onClick={() => setSelectedCompany(company)}
                    title={t.analytics}
                    className="p-1.5 text-[var(--foreground)] hover:text-[var(--secondary-foreground)] rounded transition-colors"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
              
              <h3 className="font-bold text-sm text-[var(--foreground)] mb-2">{company.name}</h3>
              
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-[10px]">
                  <User size={10} className="text-[var(--foreground)]" />
                  <span className="text-[var(--foreground)]">{t.username}:</span>
                  <span className="font-bold text-[var(--foreground)]">{company.username}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <Lock size={10} className="text-[var(--foreground)]" />
                  <span className="text-[var(--foreground)]">{t.password}:</span>
                  <span className="font-bold text-[var(--foreground)] font-mono">{company.plainPassword}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <ExternalLink size={10} className="text-[var(--foreground)]" />
                  <span className="text-[var(--foreground)]">ID:</span>
                  <span className="text-[var(--foreground)] font-mono">{company.id}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--foreground)]">
                  <Users size={12} />
                  <span>{company.stats.total} {t.customers}</span>
                </div>
                <button 
                  onClick={() => setSelectedCompany(company)}
                  className="text-[10px] font-bold text-[var(--foreground)] hover:underline"
                >
                  {t.analytics} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[var(--secondary)] backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                <h3 className="font-bold text-[var(--foreground)]">
                  {modalMode === 'add' ? t.add_company : t.edit_company}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-[var(--foreground)] hover:text-[var(--secondary-foreground)]">
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {modalMessage && (
                  <div className={`p-3 rounded-lg flex items-center gap-3 text-xs font-medium ${
                    modalMessage.type === 'success' ? 'bg-[var(--background)] text-[var(--foreground)]' : 'bg-[var(--background)] text-[var(--foreground)]'
                  }`}>
                    {modalMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {modalMessage.text}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.company_name}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg outline-none focus:ring-2 focus:ring-2 ring-[var(--border)] text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.username}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg outline-none focus:ring-2 focus:ring-2 ring-[var(--border)] text-sm"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--foreground)] uppercase">{t.password}</label>
                  <input
                    type="text"
                    required={modalMode === 'add'}
                    className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg outline-none focus:ring-2 focus:ring-2 ring-[var(--border)] text-sm font-mono"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={modalMode === 'edit' ? "Leave blank to keep current" : ""}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 bg-[var(--background)] text-[var(--foreground)] font-bold rounded-lg text-xs"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="flex-1 py-2 bg-[var(--secondary)] hover:bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold rounded-lg text-xs disabled:opacity-50"
                  >
                    {modalLoading ? "..." : t.save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal 
          isOpen={!!deleteConfirm?.isOpen}
          title={t.delete_company}
          message={t.confirm_delete_company}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
          confirmText={t.delete}
          cancelText={t.cancel}
        />
        <ToastContainer />
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <p className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-1">{t.total_customers}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-xl font-bold">{companies.reduce((acc, c) => acc + c.stats.total, 0)}</h3>
            <span className="text-[10px] text-[var(--foreground)] font-bold flex items-center gap-0.5">
              <ArrowUpRight size={10} /> 12%
            </span>
          </div>
        </div>
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <p className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-1">{t.companies}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-xl font-bold">{companies.length}</h3>
            <span className="text-[10px] text-[var(--foreground)] font-bold">Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Arrived vs Not Arrived */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-4">Overall Arrived vs Not Arrived</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aggregatePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {aggregatePieData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Week Trend */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-4">Overall 7-Day Arrived Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalStats.weekTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" fontSize={9} axisLine={false} tickLine={false} />
                <YAxis fontSize={9} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="arrived" fill="#22c55e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Month Trend */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-4">Overall 4-Week Trend (Total/Arr/Not)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalStats.monthTrend}>
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

        {/* Chart 4: 3 Month Trend */}
        <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] shadow-sm">
          <h3 className="text-[10px] font-bold text-[var(--foreground)] uppercase mb-4">Overall 3-Month Trend (Total/Arr/Not)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalStats.threeMonthTrend}>
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
