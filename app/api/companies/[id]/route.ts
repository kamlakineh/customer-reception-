import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase();
    const { id } = await params;
    const body = await req.json();
    const { name, username, password } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (password) {
      updateData.password_hash = hashPassword(password);
      updateData.plain_password = password;
    }

    const { data, error } = await supabase
      .from('companies')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Database update error:", error);
      return NextResponse.json({ message: "Error updating company" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Update company error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase();
    const { id } = await params;

    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Database delete error:", error);
      return NextResponse.json({ message: "Error deleting company" }, { status: 500 });
    }

    return NextResponse.json({ message: "Company deleted successfully" });
  } catch (error: any) {
    console.error("Delete company error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
