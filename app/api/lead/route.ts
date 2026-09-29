import { NextResponse } from "next/server";

// Forwards estimate requests as JSON to LEAD_WEBHOOK_URL (e.g. a GoHighLevel inbound webhook or Zapier hook).
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try { data = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const phone = String(data.phone || "").replace(/\D/g, "");
  if (phone.length < 10) return NextResponse.json({ error: "Phone number is required" }, { status: 422 });

  const lead = {
    ...data,
    phone,
    submittedAt: new Date().toISOString(),
    page: req.headers.get("referer") || null,
    userAgent: req.headers.get("user-agent") || null,
  };

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.error("LEAD_WEBHOOK_URL is not set — lead not delivered", lead);
    return NextResponse.json({ error: "Form delivery is not configured" }, { status: 503 });
  }
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
  if (!res.ok) return NextResponse.json({ error: "Could not deliver lead" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
