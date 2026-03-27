import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = getSupabase();
  const { id } = await params;
  const body = await req.json();
  
  const updateData: any = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.phone !== undefined) updateData.phone = body.phone;
  if (body.status !== undefined) updateData.status = body.status;
  if (body.arrivalTime !== undefined) updateData.arrival_time = body.arrivalTime;
  if (body.pain !== undefined) updateData.pain = body.pain;

  const { data, error } = await supabase
    .from('customers')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: "Error updating customer" }, { status: 500 });
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

  return NextResponse.json(mapped);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = getSupabase();
  const { id } = await params;
  
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ message: "Error deleting customer" }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted" });
}
