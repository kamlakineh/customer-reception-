import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const supabase = getSupabase();
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("companyId");
  const status = searchParams.get("status");

  if (!companyId) {
    return NextResponse.json({ message: "Company ID required" }, { status: 400 });
  }

  let query = supabase
    .from('customers')
    .select('*')
    .eq('company_id', companyId);
  
  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ message: "Error fetching customers" }, { status: 500 });
  }

  const mapped = data.map(c => ({
    id: c.id,
    companyId: c.company_id,
    name: c.name,
    phone: c.phone,
    status: c.status,
    arrivalTime: c.arrival_time,
    pain: c.pain,
    createdAt: c.created_at
  }));

  return NextResponse.json(mapped);
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const body = await req.json();
    
    const { data, error } = await supabase
      .from('customers')
      .insert([{
        company_id: body.companyId,
        name: body.name,
        phone: body.phone,
        status: body.status || 'NOT_ARRIVED',
        arrival_time: body.arrivalTime,
        pain: body.pain
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: "Error creating customer" }, { status: 500 });
    }
    
    const mapped = {
      id: data.id,
      companyId: data.company_id,
      name: data.name,
      phone: data.phone,
      status: data.status,
      arrivalTime: data.arrival_time,
      pain: data.pain,
      createdAt: data.created_at
    };
    
    return NextResponse.json(mapped, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating customer" }, { status: 500 });
  }
}
