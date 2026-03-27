import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getCompanyStats } from "@/lib/stats";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  const supabase = getSupabase();
  const { data: companies, error: companiesError } = await supabase
    .from('companies')
    .select('*');

  if (companiesError) {
    return NextResponse.json({ message: "Error fetching companies" }, { status: 500 });
  }

  const { data: customers, error: customersError } = await supabase
    .from('customers')
    .select('*');

  if (customersError) {
    return NextResponse.json({ message: "Error fetching customers" }, { status: 500 });
  }

  const data = companies.map(company => {
    const mappedCompany = {
      id: company.id,
      name: company.name,
      username: company.username,
      passwordHash: company.password_hash,
      plainPassword: company.plain_password
    };

    const companyCustomers = customers
      .filter(c => c.company_id === company.id)
      .map(c => ({
        id: c.id,
        companyId: c.company_id,
        name: c.name,
        phone: c.phone,
        status: c.status,
        arrivalTime: c.arrival_time,
        pain: c.pain,
        createdAt: c.created_at
      }));

    const stats = getCompanyStats(companyCustomers);

    return {
      ...mappedCompany,
      stats
    };
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const { name, username, password } = await req.json();

    if (!name || !username || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const hash = hashPassword(password);

    const { data, error } = await supabase
      .from('companies')
      .insert([{ 
        name, 
        username, 
        password_hash: hash,
        plain_password: password // Storing plain password as requested by user ("see company password")
      }])
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return NextResponse.json({ message: "Error creating company" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Create company error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
