"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROJECT_TYPES, BIZ } from "@/lib/site";

type Errors = Record<string, string>;
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 10;

async function send(data: Record<string, unknown>) {
  const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Request failed");
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className={"field" + (error ? " field--err" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="err" id={id + "-err"}>{error}</span>}
    </div>
  );
}

export function QuickForm({ source = "hero" }: { source?: string }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Errors = {};
    if (!f.name?.trim()) errs.name = "Enter your name";
    if (!phoneOk(f.phone || "")) errs.phone = "Enter a 10-digit phone number";
    if (!/^\d{5}$/.test(f.zip || "")) errs.zip = "Enter a 5-digit ZIP";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true); setFail("");
    try { await send({ ...f, source }); router.push("/thank-you"); }
    catch { setFail(`We couldn't send that. Call or text ${BIZ.phone} and we'll get you booked.`); setBusy(false); }
  }

  return (
    <form className="qform" onSubmit={onSubmit} noValidate aria-label="Quick free estimate">
      <div className="qform__title">Free estimate<small>Takes 30 seconds</small></div>
      <Field id="q-name" label="Name" error={errors.name}><input className="input" id="q-name" name="name" autoComplete="name" placeholder="Your name" onInput={() => setErrors((e) => ({ ...e, name: "" }))} /></Field>
      <Field id="q-phone" label="Phone" error={errors.phone}><input className="input" id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(602) 555-0123" onInput={() => setErrors((e) => ({ ...e, phone: "" }))} /></Field>
      <Field id="q-zip" label="ZIP" error={errors.zip}><input className="input" id="q-zip" name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="85339" onInput={() => setErrors((e) => ({ ...e, zip: "" }))} /></Field>
      <Field id="q-proj" label="Project">
        <select className="input" id="q-proj" name="project" defaultValue="Exterior">{PROJECT_TYPES.map((p) => <option key={p}>{p}</option>)}</select>
      </Field>
      <button className="btn btn--red" type="submit" disabled={busy}>{busy ? "Sending…" : "Get my free estimate"}</button>
      {fail && <p className="err" role="alert" style={{ gridColumn: "1 / -1", margin: 0 }}>{fail}</p>}
    </form>
  );
}

export function FullForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");
  const clear = (k: string) => () => setErrors((e) => ({ ...e, [k]: "" }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const f = Object.fromEntries(fd) as Record<string, string>;
    const projects = fd.getAll("projects");
    const errs: Errors = {};
    if (!f.firstName?.trim()) errs.firstName = "Enter your first name";
    if (!phoneOk(f.phone || "")) errs.phone = "Enter a 10-digit phone number";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) errs.email = "Check the email address";
    if (!/^\d{5}$/.test(f.zip || "")) errs.zip = "Enter a 5-digit ZIP";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true); setFail("");
    try { await send({ ...f, projects, source: "full-form" }); router.push("/thank-you"); }
    catch { setFail(`We couldn't send that. Call or text ${BIZ.phone} and we'll get you booked.`); setBusy(false); }
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 20 }} aria-label="Request a free estimate">
      <h2 className="h-md">Request a free estimate</h2>
      <div className="grid2">
        <Field id="f-first" label="First name" error={errors.firstName}><input className="input" id="f-first" name="firstName" autoComplete="given-name" onInput={clear("firstName")} /></Field>
        <Field id="f-last" label="Last name"><input className="input" id="f-last" name="lastName" autoComplete="family-name" /></Field>
        <Field id="f-phone" label="Phone" error={errors.phone}><input className="input" id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" onInput={clear("phone")} /></Field>
        <Field id="f-email" label="Email (optional)" error={errors.email}><input className="input" id="f-email" name="email" type="email" autoComplete="email" onInput={clear("email")} /></Field>
        <Field id="f-addr" label="Street address (optional)"><input className="input" id="f-addr" name="address" autoComplete="street-address" /></Field>
        <Field id="f-zip" label="ZIP code" error={errors.zip}><input className="input" id="f-zip" name="zip" inputMode="numeric" maxLength={5} autoComplete="postal-code" onInput={clear("zip")} /></Field>
      </div>
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>What needs painting? Select all that apply.</legend>
        <div className="chips" style={{ marginTop: 10 }}>
          {PROJECT_TYPES.map((p, i) => <label className="chip" key={p}><input type="checkbox" name="projects" value={p} defaultChecked={i === 0} /><span>{p}</span></label>)}
        </div>
      </fieldset>
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>When would you like to start?</legend>
        <div className="radios" style={{ marginTop: 10 }}>
          {["As soon as possible", "In 1–3 months", "Just planning"].map((t, i) => <label key={t}><input type="radio" name="timing" value={t} defaultChecked={i === 0} />{t}</label>)}
        </div>
      </fieldset>
      <Field id="f-msg" label="Project details (optional)"><textarea className="input" id="f-msg" name="message" placeholder="Surfaces, colors, repairs you've noticed…" /></Field>
      <button className="btn btn--red" type="submit" disabled={busy} style={{ width: "100%" }}>{busy ? "Sending…" : "Send my estimate request"}</button>
      {fail && <p className="err" role="alert">{fail}</p>}
      <p className="form-note" style={{ color: "#8a8a8a", margin: 0 }}>By sending this, you agree to be contacted about your project by phone, text or email.</p>
    </form>
  );
}
