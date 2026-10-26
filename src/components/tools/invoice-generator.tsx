"use client";

import { useMemo, useState } from "react";
import { Plus, Printer, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";

type LineItem = { id: number; description: string; quantity: number; rate: number };

const EMPTY_ITEM = (): LineItem => ({
  id: Date.now() + Math.random(),
  description: "",
  quantity: 1,
  rate: 0,
});

const SAMPLE_ITEMS: LineItem[] = [
  { id: 1, description: "Website design — homepage and services pages", quantity: 1, rate: 120000 },
  { id: 2, description: "Contact form and on-page SEO setup", quantity: 1, rate: 45000 },
  { id: 3, description: "Monthly maintenance (per month)", quantity: 3, rate: 15000 },
];

function money(value: number, currency: "PKR" | "USD") {
  return new Intl.NumberFormat(currency === "PKR" ? "en-PK" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "PKR" ? 0 : 2,
  }).format(value);
}

const inputCls =
  "w-full rounded-xl border border-mist-100/15 bg-ink-950/60 px-4 py-2.5 text-mist-100 outline-none placeholder:text-mist-500";
const labelCls = "mb-1.5 block text-sm font-medium text-mist-300";

export function InvoiceGenerator() {
  const [docType, setDocType] = useState<"invoice" | "quote">("invoice");
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [businessName, setBusinessName] = useState("");
  const [businessDetails, setBusinessDetails] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientDetails, setClientDetails] = useState("");
  const [docNumber, setDocNumber] = useState("INV-001");
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("Payment due within 14 days. Thank you for your business.");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState<LineItem[]>([EMPTY_ITEM()]);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, it) => sum + (Number.isFinite(it.quantity) ? it.quantity : 0) * (Number.isFinite(it.rate) ? it.rate : 0),
      0,
    );
    const discountAmount = Math.min(Math.max(discount, 0), subtotal);
    const taxable = subtotal - discountAmount;
    const taxAmount = Math.max(taxRate, 0) * taxable / 100;
    return { subtotal, discountAmount, taxAmount, total: taxable + taxAmount };
  }, [items, discount, taxRate]);

  function loadSample() {
    setDocType("invoice");
    setCurrency("PKR");
    setBusinessName("AISquadX Studio");
    setBusinessDetails("Web development, SaaS & AI integration\nhello@aisquadx.tech");
    setClientName("Acme Traders (Pvt) Ltd");
    setClientDetails("Karachi, Pakistan");
    setDocNumber("INV-001");
    setIssueDate(new Date().toISOString().slice(0, 10));
    setDueDate("");
    setNotes("Payment due within 14 days. Thank you for your business.");
    setTaxRate(0);
    setDiscount(0);
    setItems(SAMPLE_ITEMS.map((it) => ({ ...it })));
  }

  function resetAll() {
    setDocType("invoice");
    setCurrency("PKR");
    setBusinessName("");
    setBusinessDetails("");
    setClientName("");
    setClientDetails("");
    setDocNumber("INV-001");
    setIssueDate(new Date().toISOString().slice(0, 10));
    setDueDate("");
    setNotes("");
    setTaxRate(0);
    setDiscount(0);
    setItems([EMPTY_ITEM()]);
  }

  function updateItem(id: number, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  const docLabel = docType === "invoice" ? "Invoice" : "Quote";

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #invoice-print, #invoice-print * { visibility: visible !important; }
          #invoice-print { position: absolute !important; inset: 0 !important; width: 100% !important; margin: 0 !important; box-shadow: none !important; }
        }
      `}</style>
      <div className="print:hidden">
        <PageHeader
          eyebrow="Free tool"
          title={
            <>
              Invoice & quote{" "}
              <span className="italic text-brand-400">generator</span>
            </>
          }
          description="Build a professional invoice or quote in PKR or USD, watch the preview update as you type, then print or save it as a PDF. Free, no sign-up, nothing stored."
        />
      </div>

      <Container className="pb-24 print:hidden">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Form */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {(["invoice", "quote"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setDocType(t)}
                  className={`rounded-xl px-5 py-2.5 font-medium capitalize transition ${
                    docType === t ? "bg-brand-400 text-ink-950" : "surface text-mist-300 hover:text-mist-100"
                  }`}
                >
                  {t}
                </button>
              ))}
              <select
                aria-label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "PKR" | "USD")}
                className="rounded-xl border border-mist-100/15 bg-ink-950/60 px-4 py-2.5 text-mist-100 outline-none"
              >
                <option value="PKR">PKR — Pakistani Rupee</option>
                <option value="USD">USD — US Dollar</option>
              </select>
              <button
                onClick={loadSample}
                className="surface inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-mist-100 transition hover:text-brand-300"
              >
                <Sparkles className="h-4 w-4" />
                Load sample
              </button>
              <button
                onClick={resetAll}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-mist-400 hover:text-mist-100"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            <div className="surface grid gap-4 rounded-2xl p-5 sm:grid-cols-2">
              <div>
                <label htmlFor="biz-name" className={labelCls}>Your business name</label>
                <input id="biz-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. AISquadX Studio" className={inputCls} />
              </div>
              <div>
                <label htmlFor="client-name" className={labelCls}>Client name</label>
                <input id="client-name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Acme Traders" className={inputCls} />
              </div>
              <div>
                <label htmlFor="biz-details" className={labelCls}>Your details</label>
                <textarea id="biz-details" rows={3} value={businessDetails} onChange={(e) => setBusinessDetails(e.target.value)} placeholder="Address, email, phone…" className={inputCls} />
              </div>
              <div>
                <label htmlFor="client-details" className={labelCls}>Client details</label>
                <textarea id="client-details" rows={3} value={clientDetails} onChange={(e) => setClientDetails(e.target.value)} placeholder="Address, email, phone…" className={inputCls} />
              </div>
              <div>
                <label htmlFor="doc-number" className={labelCls}>{docLabel} number</label>
                <input id="doc-number" value={docNumber} onChange={(e) => setDocNumber(e.target.value)} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="issue-date" className={labelCls}>Date</label>
                  <input id="issue-date" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="due-date" className={labelCls}>Due date</label>
                  <input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
                </div>
              </div>
            </div>

            <div className="surface rounded-2xl p-5">
              <p className="font-medium text-mist-100">Line items</p>
              <div className="mt-4 space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="grid grid-cols-[1fr_72px_110px_36px] items-center gap-2 sm:grid-cols-[1fr_88px_140px_36px]">
                    <input
                      aria-label="Item description"
                      value={it.description}
                      onChange={(e) => updateItem(it.id, { description: e.target.value })}
                      placeholder="Description"
                      className={inputCls}
                    />
                    <input
                      aria-label="Quantity"
                      type="number"
                      min={0}
                      step="any"
                      value={it.quantity}
                      onChange={(e) => updateItem(it.id, { quantity: Number(e.target.value) || 0 })}
                      className={inputCls}
                    />
                    <input
                      aria-label="Rate"
                      type="number"
                      min={0}
                      step="any"
                      value={it.rate}
                      onChange={(e) => updateItem(it.id, { rate: Number(e.target.value) || 0 })}
                      className={inputCls}
                    />
                    <button
                      aria-label="Remove item"
                      disabled={items.length === 1}
                      onClick={() => setItems((prev) => prev.filter((x) => x.id !== it.id))}
                      className="text-mist-400 hover:text-accent-400 disabled:opacity-30"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setItems((prev) => [...prev, EMPTY_ITEM()])}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-mist-100/20 px-4 py-2 text-sm font-medium text-mist-100 transition hover:text-brand-300"
              >
                <Plus className="h-4 w-4" />
                Add item
              </button>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="tax-rate" className={labelCls}>Tax (%)</label>
                  <input id="tax-rate" type="number" min={0} step="any" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value) || 0)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="discount" className={labelCls}>Discount ({currency})</label>
                  <input id="discount" type="number" min={0} step="any" value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="notes" className={labelCls}>Notes / payment terms</label>
                <textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls} />
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-400 px-6 py-3.5 font-medium text-ink-950 transition hover:bg-brand-300 sm:w-auto"
            >
              <Printer className="h-5 w-5" />
              Print / Save as PDF
            </button>
            <p className="text-sm text-mist-400">
              In the print dialog, choose “Save as PDF” as the destination. Only
              the document itself prints — this form does not.
            </p>
          </div>

          {/* Preview */}
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-mist-400">
              Live preview — A4
            </p>
            <InvoicePreview
              docLabel={docLabel}
              currency={currency}
              businessName={businessName}
              businessDetails={businessDetails}
              clientName={clientName}
              clientDetails={clientDetails}
              docNumber={docNumber}
              issueDate={issueDate}
              dueDate={dueDate}
              notes={notes}
              taxRate={taxRate}
              items={items}
              totals={totals}
            />
          </div>
        </div>
      </Container>

      {/* Print-only render: same preview, shown only when printing */}
      <div className="hidden print:block">
        <InvoicePreview
          printId
          docLabel={docLabel}
          currency={currency}
          businessName={businessName}
          businessDetails={businessDetails}
          clientName={clientName}
          clientDetails={clientDetails}
          docNumber={docNumber}
          issueDate={issueDate}
          dueDate={dueDate}
          notes={notes}
          taxRate={taxRate}
          items={items}
          totals={totals}
        />
      </div>
    </>
  );
}

function InvoicePreview(props: {
  printId?: boolean;
  docLabel: string;
  currency: "PKR" | "USD";
  businessName: string;
  businessDetails: string;
  clientName: string;
  clientDetails: string;
  docNumber: string;
  issueDate: string;
  dueDate: string;
  notes: string;
  taxRate: number;
  items: LineItem[];
  totals: { subtotal: number; discountAmount: number; taxAmount: number; total: number };
}) {
  const { docLabel, currency, totals } = props;
  const filled = props.items.filter((it) => it.description.trim() !== "" || it.quantity !== 0 || it.rate !== 0);
  return (
    <article
      id={props.printId ? "invoice-print" : undefined}
      className="w-full bg-white p-8 text-neutral-900 shadow-2xl sm:p-10"
      style={{ minHeight: "842px" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-bold tracking-tight">
            {props.businessName || "Your Business"}
          </p>
          <p className="mt-2 max-w-xs whitespace-pre-line text-sm text-neutral-600">
            {props.businessDetails || "Your address, email and phone go here."}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold uppercase tracking-wide">{docLabel}</p>
          <p className="mt-2 text-sm text-neutral-600">{props.docNumber || "—"}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 text-sm">
        <div>
          <p className="font-semibold uppercase tracking-wide text-neutral-500">Billed to</p>
          <p className="mt-1 font-medium">{props.clientName || "Client name"}</p>
          <p className="whitespace-pre-line text-neutral-600">
            {props.clientDetails || "Client details go here."}
          </p>
        </div>
        <div className="text-right">
          <p><span className="text-neutral-500">Date: </span>{props.issueDate || "—"}</p>
          {props.dueDate ? <p className="mt-1"><span className="text-neutral-500">Due: </span>{props.dueDate}</p> : null}
        </div>
      </div>

      <table className="mt-8 w-full text-sm">
        <thead>
          <tr className="border-b-2 border-neutral-900 text-left">
            <th className="py-2 pr-2 font-semibold">Description</th>
            <th className="w-16 py-2 text-right font-semibold">Qty</th>
            <th className="w-28 py-2 text-right font-semibold">Rate</th>
            <th className="w-32 py-2 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filled.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-6 text-center text-neutral-500">
                No items yet — add a line item to see it here.
              </td>
            </tr>
          ) : (
            filled.map((it) => (
              <tr key={it.id} className="border-b border-neutral-200">
                <td className="py-2.5 pr-2">{it.description || "—"}</td>
                <td className="py-2.5 text-right">{it.quantity}</td>
                <td className="py-2.5 text-right">{money(it.rate, currency)}</td>
                <td className="py-2.5 text-right">{money(it.quantity * it.rate, currency)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="ml-auto mt-6 w-64 space-y-1.5 text-sm">
        <p className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>{money(totals.subtotal, currency)}</span></p>
        {totals.discountAmount > 0 ? (
          <p className="flex justify-between"><span className="text-neutral-500">Discount</span><span>−{money(totals.discountAmount, currency)}</span></p>
        ) : null}
        {totals.taxAmount > 0 ? (
          <p className="flex justify-between"><span className="text-neutral-500">Tax ({props.taxRate}%)</span><span>{money(totals.taxAmount, currency)}</span></p>
        ) : null}
        <p className="flex justify-between border-t-2 border-neutral-900 pt-2 text-base font-bold">
          <span>Total</span><span>{money(totals.total, currency)}</span>
        </p>
      </div>

      {props.notes ? (
        <p className="mt-10 whitespace-pre-line border-t border-neutral-200 pt-4 text-sm text-neutral-600">
          {props.notes}
        </p>
      ) : null}
    </article>
  );
}
