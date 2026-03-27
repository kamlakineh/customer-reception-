"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { Customer } from "@/types";
import {
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Search,
  Download
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { ConfirmModal } from "./ui/ConfirmModal";

interface CustomerTableProps {
  companyId: string;
  readOnly?: boolean;
  onUpdate?: () => void;
}

export default function CustomerTable({ companyId, readOnly = false, onUpdate }: CustomerTableProps) {
  const { language } = useStore();
  const t = translations[language];
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "", pain: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, id: string } | null>(null);

  const fetchCustomers = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/customers?companyId=${companyId}`);
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const downloadCSV = () => {
    const headers = ["Name", "Phone", "Status", "Arrival Time", "Pain"];
    const rows = filteredCustomers.map(c => [
      c.name,
      c.phone,
      c.status,
      c.arrivalTime ? formatDate(c.arrivalTime) : "-",
      c.pain || "-"
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `customers_${companyId}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleStatus = async (customer: Customer) => {
    if (readOnly) return;
    const newStatus = customer.status === "ARRIVED" ? "NOT_ARRIVED" : "ARRIVED";
    const arrivalTime = newStatus === "ARRIVED" ? new Date().toISOString() : null;

    try {
      await fetch(`/api/customers/${customer.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, arrivalTime }),
      });
      fetchCustomers();
      onUpdate?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (readOnly) return;
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await fetch(`/api/customers/${deleteConfirm.id}`, { method: "DELETE" });
      fetchCustomers();
      onUpdate?.();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const startEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setEditForm({ name: customer.name, phone: customer.phone, pain: customer.pain || "" });
  };

  const handleSaveEdit = async () => {
    try {
      await fetch(`/api/customers/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      setEditingId(null);
      fetchCustomers();
      onUpdate?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2 p-2 justify-between items-center">
        <div className="relative w-full sm:w-68">
          {/* <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]" /> */}
          <input
            type="text"
            placeholder="Search name or phone..."
            className="input-field pl-10 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={downloadCSV}
          className="btn-secondary flex items-center gap-2 text-xs py-2 w-full sm:w-auto justify-center"
        >
          <Download size={14} />
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-[var(--background)] rounded-xl border border-[var(--border)]">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-[var(--background)] border-b border-[var(--border)]">
            <tr>
              <th className="px-3 py-2 text-[10px] font-bold text-[var(--foreground)] uppercase tracking-wider">{t.name}</th>
              <th className="px-3 py-2 text-[10px] font-bold text-[var(--foreground)] uppercase tracking-wider">{t.phone}</th>
              <th className="px-3 py-2 text-[10px] font-bold text-[var(--foreground)] uppercase tracking-wider">{t.status}</th>
              <th className="px-3 py-2 text-[10px] font-bold text-[var(--foreground)] uppercase tracking-wider">{t.arrival_time}</th>
              <th className="px-3 py-2 text-[10px] font-bold text-[var(--foreground)] uppercase tracking-wider">{t.pain}</th>
              {!readOnly && <th className="px-3 py-2 text-[10px] font-bold text-[var(--foreground)] uppercase tracking-wider">{t.actions}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="">
                <td className="px-3 py-2">
                  {editingId === customer.id ? (
                    <input
                      className="input-field py-0.5 text-xs"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--foreground)]">
                        <User size={12} />
                      </div>
                      <span className="text-xs font-semibold text-[var(--foreground)]">{customer.name}</span>
                    </div>
                  )}
                </td>
                <td className="px-3 py-2">
                  {editingId === customer.id ? (
                    <input
                      className="input-field py-0.5 text-xs"
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  ) : (
                    <span className="text-xs text-[var(--foreground)]">{customer.phone}</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {/* Status Toggle Switch */}
                    <button
                      disabled={readOnly}
                      onClick={() => toggleStatus(customer)}
                      className={cn(
                        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
                        customer.status === "ARRIVED" ? "bg-green-500" : "bg-gray-200",
                        readOnly ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-3.5 w-3.5 transform rounded-full bg-[var(--background)] transition-transform",
                          customer.status === "ARRIVED" ? "translate-x-5" : "translate-x-0.5"
                        )}
                      />
                    </button>
                    <span className={cn(
                      "text-[10px] font-bold uppercase",
                      customer.status === "ARRIVED" ? "text-[var(--foreground)]" : "text-[var(--foreground)]"
                    )}>
                      {customer.status === "ARRIVED" ? t.arrived : t.not_arrived}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2 text-xs text-[var(--foreground)]">
                  {customer.arrivalTime ? (
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(customer.arrivalTime)}
                    </div>
                  ) : "-"}
                </td>
                <td className="px-3 py-2">
                  {editingId === customer.id ? (
                    <input
                      className="input-field py-0.5 text-xs"
                      value={editForm.pain}
                      onChange={e => setEditForm({ ...editForm, pain: e.target.value })}
                    />
                  ) : (
                    <span className="text-xs text-[var(--foreground)] truncate max-w-[120px] block">
                      {customer.pain || "-"}
                    </span>
                  )}
                </td>
                {!readOnly && (
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      {editingId === customer.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="text-[10px] font-bold text-[var(--foreground)] hover:underline">{t.save}</button>
                          <button onClick={() => setEditingId(null)} className="text-[10px] font-bold text-[var(--foreground)] hover:underline">{t.cancel}</button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(customer)}
                            className="p-1 text-green-500 rounded transition-colors"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="p-1 text-red-500 rounded transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCustomers.length === 0 && (
          <div className="p-6 text-center text-[var(--foreground)] text-xs italic">
            No records found.
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteConfirm?.isOpen}
        title="Delete Customer"
        message="Are you sure you want to delete this customer record?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText={t.delete}
        cancelText={t.cancel}
      />
    </div>
  );
}
