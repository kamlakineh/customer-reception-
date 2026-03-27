import { subDays, subWeeks, subMonths, format, isSameDay, isSameWeek, isSameMonth, parseISO } from "date-fns";
import { Customer } from "@/types";

export function getCompanyStats(companyCustomers: Customer[]) {
  const arrivedCount = companyCustomers.filter(c => c.status === "ARRIVED").length;
  const notArrivedCount = companyCustomers.length - arrivedCount;

  const now = new Date();

  // 1. Arrived vs Not Arrived
  const pieData = [
    { name: "Arrived", value: arrivedCount, color: "#22c55e" },
    { name: "Not Arrived", value: notArrivedCount, color: "#ef4444" },
  ];

  // 2. Week Trend (7 days) - Only Arrived count
  const weekTrend = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(now, 6 - i);
    const count = companyCustomers.filter(c => 
      c.status === "ARRIVED" && 
      c.arrivalTime && 
      isSameDay(parseISO(c.arrivalTime), date)
    ).length;
    return {
      day: format(date, "EEE"),
      arrived: count
    };
  });

  // 3. Month Trend (4 weeks) - Total, Arrived, Not Arrived
  const monthTrend = Array.from({ length: 4 }).map((_, i) => {
    const date = subWeeks(now, 3 - i);
    const weekCustomers = companyCustomers.filter(c => {
      if (!c.createdAt) return false;
      try {
        return isSameWeek(parseISO(c.createdAt), date);
      } catch {
        return false;
      }
    });
    const arrived = weekCustomers.filter(c => c.status === "ARRIVED").length;
    const notArrived = weekCustomers.length - arrived;
    return {
      week: `W${4 - i}`,
      total: weekCustomers.length,
      arrived,
      notArrived
    };
  });

  // 4. 3 Month Trend (Each month) - Total, Arrived, Not Arrived
  const threeMonthTrend = Array.from({ length: 3 }).map((_, i) => {
    const date = subMonths(now, 2 - i);
    const monthCustomers = companyCustomers.filter(c => {
      if (!c.createdAt) return false;
      try {
        return isSameMonth(parseISO(c.createdAt), date);
      } catch {
        return false;
      }
    });
    const arrived = monthCustomers.filter(c => c.status === "ARRIVED").length;
    const notArrived = monthCustomers.length - arrived;
    return {
      month: format(date, "MMM"),
      total: monthCustomers.length,
      arrived,
      notArrived
    };
  });

  return {
    total: companyCustomers.length,
    arrived: arrivedCount,
    notArrived: notArrivedCount,
    pieData,
    weekTrend,
    monthTrend,
    threeMonthTrend
  };
}
