import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { comparePassword, hashPassword, getDefaultAdminPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }

    const defaultAdminPassword = getDefaultAdminPassword();

    // Check Admin
    let { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    // If admin doesn't exist and trying to login with default credentials, create it
    if (!admin && username === 'admin' && password === defaultAdminPassword) {
      const hash = hashPassword(password);
      const { data: newAdmin, error: insertError } = await supabase
        .from('admin_users')
        .insert([{ username: 'admin', password_hash: hash }])
        .select()
        .single();
      
      if (!insertError) {
        admin = newAdmin;
        adminError = null;
      }
    }

    if (admin && !adminError) {
      const isMatch = comparePassword(password, admin.password_hash);
      if (isMatch) {
        return NextResponse.json({
          user: { id: admin.id, username: admin.username, role: "ADMIN" }
        });
      }
    }

    // Check Company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('username', username)
      .single();

    if (company && !companyError) {
      const isMatch = comparePassword(password, company.password_hash);
      if (isMatch) {
        return NextResponse.json({
          user: { id: company.id, username: company.username, role: "COMPANY", companyId: company.id }
        });
      }
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
