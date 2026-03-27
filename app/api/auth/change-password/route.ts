import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const { userId, role, newPassword } = await req.json();

    if (!userId || !role || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const table = role === "ADMIN" ? "admin_users" : "companies";
    const updateData: any = { password_hash: hash };
    if (role === "COMPANY") {
      updateData.plain_password = newPassword;
    }

    const { error } = await supabase
      .from(table)
      .update(updateData)
      .eq("id", userId);

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Error updating password" }, { status: 500 });
    }

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
