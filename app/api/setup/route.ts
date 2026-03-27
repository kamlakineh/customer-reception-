import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { hashPassword, getDefaultAdminPassword } from "@/lib/auth";

export async function GET() {
  try {
    const supabase = getSupabase();
    const password = getDefaultAdminPassword();
    const hash = hashPassword(password);

    // Check if admin exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', 'admin')
      .single();

    if (existingAdmin) {
      // Update existing admin
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: hash })
        .eq('username', 'admin');
      
      if (updateError) throw updateError;
      return NextResponse.json({ message: "Admin password updated successfully" });
    } else {
      // Create new admin
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([{ username: 'admin', password_hash: hash }]);
      
      if (insertError) throw insertError;
      return NextResponse.json({ message: "Admin user created successfully" });
    }
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json({ message: "Error setting up admin", error: error.message }, { status: 500 });
  }
}
