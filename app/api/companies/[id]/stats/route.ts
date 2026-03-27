import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getCompanyStats } from "@/lib/stats";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase();
    const { id: companyId } = await params;
    
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*')
      .eq('company_id', companyId);

    if (error) {
      console.error("Supabase error fetching customers:", error);
      return NextResponse.json({ message: `Database error: ${error.message}` }, { status: 500 });
    }

    if (!customers) {
      return NextResponse.json({ message: "No customers found" }, { status: 404 });
    }

    const mapped = customers.map(c => ({
      id: c.id,
      companyId: c.company_id,
      name: c.name,
      phone: c.phone,
      status: c.status,
      arrivalTime: c.arrival_time,
      pain: c.pain,
      createdAt: c.created_at
    }));

    const stats = getCompanyStats(mapped);

    return NextResponse.json(stats);
  } catch (err: any) {
    console.error("Unexpected error in stats API:", err);
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }
}
