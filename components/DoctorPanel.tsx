"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { Customer } from "@/types";
import { Send, CheckCircle2, Clock, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function DoctorPanel({ onUpdate }: { onUpdate: () => void }) {
  const { user, language } = useStore();
  const t = translations[language];
  const [arrivedCustomers, setArrivedCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pains, setPains] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchArrived = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/customers?companyId=${user?.companyId}&status=ARRIVED`);
      const data = await res.json();
      setArrivedCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    fetchArrived();
  }, [fetchArrived]);

  const filteredCustomers = arrivedCustomers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const handleAddPain = async (id: string) => {
    const pain = pains[id];
    if (!pain) return;

    try {
      await fetch(`/api/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pain }),
      });
      fetchArrived();
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <h2 className="text-lg font-bold text-[var(--foreground)]">{t.doctor_panel}</h2>
        <div className="relative w-full sm:w-64">
          {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]" /> */}
          <input
            type="text"
            placeholder="Search name or phone..."
            className="input-field pl-10 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-green-500 p-3 rounded-lg border border-[var(--border)] shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">{customer.name}</h3>
                <p className="text-[10px] text-[var(--foreground)]">{customer.phone}</p>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-[var(--foreground)] bg-[var(--background)] px-1.5 py-0.5 rounded-full uppercase">
                <CheckCircle2 size={8} />
                {t.arrived}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-[var(--foreground)] mb-3">
              <Clock size={10} />
              <span>{formatDate(customer.arrivalTime!)}</span>
            </div>

            <div className="mt-auto pt-3 border-t border-[var(--border)]">
              <label className="block text-[9px] font-bold text-[var(--foreground)] uppercase mb-1">{t.pain}</label>
              {customer.pain ? (
                <p className="text-xs text-[var(--foreground)] bg-[var(--background)] p-2 rounded italic">
                  &quot;{customer.pain}&quot;
                </p>
              ) : (
                <div className="flex gap-1.5">
                  <input
                    className="input-field py-1 text-xs"
                    placeholder="Diagnosis..."
                    value={pains[customer.id] || ""}
                    onChange={e => setPains({ ...pains, [customer.id]: e.target.value })}
                  />
                  <button
                    onClick={() => handleAddPain(customer.id)}
                    className="p-1.5 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded hover:bg-[var(--secondary)] transition-colors"
                  >
                    <Send size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {arrivedCustomers.length === 0 && (
          <div className="col-span-full p-12 text-center text-[var(--foreground)] text-sm italic border-2 border-dashed border-[var(--border)] rounded-xl">
            No patients waiting in the arrived queue.
          </div>
        )}
      </div>
    </div>
  );
}
