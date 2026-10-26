"use client";

import { useCallback, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileDown,
  FileUp,
  Image as ImageIcon,
  Loader2,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";

const MAX_FILE_BYTES = 50 * 1024 * 1024;

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function baseName(name: string) {
  return name.replace(/\.[^.]+$/, "");
}

type Output = { name: string; blob: Blob; note: string };

function parseRanges(input: string, pageCount: number): number[] | null {
  const pages = new Set<number>();
  const parts = input.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  for (const part of parts) {
    const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (start < 1 || end < start || end > pageCount) return null;
      for (let p = start; p <= end; p += 1) pages.add(p);
    } else if (/^\d+$/.test(part)) {
      const p = Number(part);
      if (p < 1 || p > pageCount) return null;
      pages.add(p);
    } else {
      return null;
    }
  }
  return [...pages].sort((a, b) => a - b);
}

function validateFiles(files: File[], accept: (f: File) => boolean, kind: string): { ok: File[]; error: string | null } {
  const ok: File[] = [];
  for (const f of files) {
    if (!accept(f)) return { ok: [], error: `"${f.name}" is not a valid ${kind} file.` };
    if (f.size > MAX_FILE_BYTES) {
      return { ok: [], error: `"${f.name}" is ${formatBytes(f.size)} — files over 50 MB are not accepted.` };
    }
    if (f.size === 0) return { ok: [], error: `"${f.name}" is empty.` };
    ok.push(f);
  }
  return { ok, error: null };
}

export function FileTools() {
  const [tab, setTab] = useState<"pdf" | "image">("pdf");

  // PDF state
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [ranges, setRanges] = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfOutputs, setPdfOutputs] = useState<Output[]>([]);

  // Image state
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [targetWidth, setTargetWidth] = useState("");
  const [targetHeight, setTargetHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [outFormat, setOutFormat] = useState<"webp" | "jpeg" | "png">("webp");
  const [imgBusy, setImgBusy] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const [imgOutputs, setImgOutputs] = useState<Output[]>([]);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const addPdfs = useCallback((files: File[]) => {
    const { ok, error } = validateFiles(
      files,
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"),
      "PDF",
    );
    setPdfError(error);
    if (!error) setPdfFiles((prev) => [...prev, ...ok]);
  }, []);

  const addImages = useCallback((files: File[]) => {
    const { ok, error } = validateFiles(
      files,
      (f) => f.type.startsWith("image/"),
      "image",
    );
    setImgError(error);
    if (!error) setImgFiles((prev) => [...prev, ...ok]);
  }, []);

  async function mergePdfs() {
    if (pdfFiles.length < 2) {
      setPdfError("Add at least two PDFs to merge.");
      return;
    }
    setPdfBusy(true);
    setPdfError(null);
    try {
      const merged = await PDFDocument.create();
      for (const file of pdfFiles) {
        const src = await PDFDocument.load(await file.arrayBuffer());
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      setPdfOutputs([{ name: "merged.pdf", blob: new Blob([bytes as BlobPart], { type: "application/pdf" }), note: `${pdfFiles.length} PDFs merged` }]);
    } catch {
      setPdfError("One of the PDFs could not be read — it may be corrupt or password-protected.");
    } finally {
      setPdfBusy(false);
    }
  }

  async function splitPdf() {
    if (pdfFiles.length !== 1) {
      setPdfError("Splitting works on one PDF at a time. Remove files until only one remains.");
      return;
    }
    setPdfBusy(true);
    setPdfError(null);
    try {
      const src = await PDFDocument.load(await pdfFiles[0].arrayBuffer());
      const pageCount = src.getPageCount();
      const pages = parseRanges(ranges, pageCount);
      if (!pages) {
        setPdfError(`Ranges look wrong. Use pages like "1-3,5" — this PDF has ${pageCount} page(s).`);
        return;
      }
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, pages.map((p) => p - 1));
      copied.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      setPdfOutputs([{
        name: `${baseName(pdfFiles[0].name)}-pages-${pages.join("-")}.pdf`,
        blob: new Blob([bytes as BlobPart], { type: "application/pdf" }),
        note: `${pages.length} page(s) extracted from a ${pageCount}-page PDF`,
      }]);
    } catch {
      setPdfError("The PDF could not be read — it may be corrupt or password-protected.");
    } finally {
      setPdfBusy(false);
    }
  }

  async function optimisePdf() {
    if (pdfFiles.length !== 1) {
      setPdfError("Optimising works on one PDF at a time.");
      return;
    }
    setPdfBusy(true);
    setPdfError(null);
    try {
      const src = await PDFDocument.load(await pdfFiles[0].arrayBuffer());
      const bytes = await src.save();
      const before = pdfFiles[0].size;
      const after = bytes.length;
      setPdfOutputs([{
        name: `${baseName(pdfFiles[0].name)}-optimised.pdf`,
        blob: new Blob([bytes as BlobPart], { type: "application/pdf" }),
        note: `${formatBytes(before)} → ${formatBytes(after)}${after < before ? " — smaller" : " — the file structure was rebuilt, but this PDF did not shrink further"}`,
      }]);
    } catch {
      setPdfError("The PDF could not be read — it may be corrupt or password-protected.");
    } finally {
      setPdfBusy(false);
    }
  }

  async function processImages() {
    if (imgFiles.length === 0) {
      setImgError("Add at least one image first.");
      return;
    }
    const width = targetWidth.trim() === "" ? null : Number(targetWidth);
    const height = targetHeight.trim() === "" ? null : Number(targetHeight);
    if ((width !== null && (!Number.isFinite(width) || width < 1 || width > 12000)) ||
        (height !== null && (!Number.isFinite(height) || height < 1 || height > 12000))) {
      setImgError("Width and height must be whole numbers between 1 and 12000 pixels, or left blank.");
      return;
    }
    setImgBusy(true);
    setImgError(null);
    try {
      const mime = outFormat === "webp" ? "image/webp" : outFormat === "jpeg" ? "image/jpeg" : "image/png";
      const outputs: Output[] = [];
      for (const file of imgFiles) {
        const bitmap = await createImageBitmap(file).catch(async () => {
          const url = URL.createObjectURL(file);
          try {
            const img = new Image();
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () => reject(new Error("load"));
              img.src = url;
            });
            return await createImageBitmap(img);
          } finally {
            URL.revokeObjectURL(url);
          }
        });
        const origW = bitmap.width;
        const origH = bitmap.height;
        let outW = origW;
        let outH = origH;
        if (width !== null && height !== null) {
          outW = width;
          outH = height;
        } else if (width !== null) {
          outW = width;
          outH = lockAspect ? Math.max(1, Math.round((origH * width) / origW)) : origH;
        } else if (height !== null) {
          outH = height;
          outW = lockAspect ? Math.max(1, Math.round((origW * height) / origH)) : origW;
        }
        const canvas = document.createElement("canvas");
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas");
        if (mime === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outW, outH);
        }
        ctx.drawImage(bitmap, 0, 0, outW, outH);
        bitmap.close();
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, mime, mime === "image/png" ? undefined : quality / 100),
        );
        if (!blob) throw new Error("encode");
        outputs.push({
          name: `${baseName(file.name)}.${outFormat === "jpeg" ? "jpg" : outFormat}`,
          blob,
          note: `${origW}×${origH} → ${outW}×${outH}, ${formatBytes(file.size)} → ${formatBytes(blob.size)}`,
        });
      }
      setImgOutputs(outputs);
    } catch {
      setImgError("One of the images could not be processed — it may be corrupt or in an unsupported format.");
    } finally {
      setImgBusy(false);
    }
  }

  const dropProps = (onDrop: (files: File[]) => void) => ({
    onDragOver: (e: React.DragEvent) => e.preventDefault(),
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      onDrop([...e.dataTransfer.files]);
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="Free tool"
        title={
          <>
            Free file tools,{" "}
            <span className="italic text-brand-400">in your browser</span>
          </>
        }
        description="Merge, split and optimise PDFs. Compress, resize and convert images. Everything runs on your own device — your files never leave this page."
      />
      <Container className="pb-24">
        <div className="surface flex items-start gap-3 rounded-2xl p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
          <p className="text-mist-300">
            <span className="font-medium text-mist-100">Private by design. </span>
            Files are processed locally in your browser. Nothing is uploaded to
            any server, and closing the tab removes them.
          </p>
        </div>

        <div className="mt-8 flex gap-2">
          {([
            { id: "pdf", label: "PDF tools", icon: FileDown },
            { id: "image", label: "Image tools", icon: ImageIcon },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
                tab === t.id
                  ? "bg-brand-400 text-ink-950"
                  : "surface text-mist-300 hover:text-mist-100"
              }`}
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "pdf" ? (
          <div className="mt-6 space-y-6">
            <div
              {...dropProps(addPdfs)}
              onClick={() => pdfInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border border-dashed border-mist-100/25 p-10 text-center transition hover:border-brand-400/60"
            >
              <Upload className="mx-auto h-10 w-10 text-mist-400" />
              <p className="mt-3 font-medium text-mist-100">
                Drop PDFs here, or click to choose
              </p>
              <p className="mt-1 text-sm text-mist-400">
                PDF files only, up to 50 MB each.
              </p>
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf,.pdf"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) addPdfs([...e.target.files]);
                  e.target.value = "";
                }}
              />
            </div>

            {pdfFiles.length > 0 ? (
              <ul className="space-y-2">
                {pdfFiles.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="surface flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                    <span className="flex items-center gap-3 truncate">
                      <FileUp className="h-5 w-5 shrink-0 text-mist-400" />
                      <span className="truncate text-mist-100">{f.name}</span>
                      <span className="shrink-0 text-sm text-mist-400">{formatBytes(f.size)}</span>
                    </span>
                    <button
                      aria-label={`Remove ${f.name}`}
                      onClick={() => setPdfFiles((prev) => prev.filter((_, j) => j !== i))}
                      className="shrink-0 text-mist-400 hover:text-accent-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="surface rounded-2xl p-5">
              <label htmlFor="split-ranges" className="font-medium text-mist-100">
                Split page ranges <span className="font-normal text-mist-400">(for splitting only)</span>
              </label>
              <input
                id="split-ranges"
                type="text"
                placeholder="e.g. 1-3,5"
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                className="mt-2 w-full rounded-xl border border-mist-100/15 bg-ink-950/60 px-4 py-3 text-mist-100 outline-none placeholder:text-mist-500"
              />
              <p className="mt-2 text-sm text-mist-400">
                Page numbers start at 1. Ranges like 1-3 and single pages like 5
                can be combined with commas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={mergePdfs}
                disabled={pdfBusy}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-400 px-5 py-3 font-medium text-ink-950 transition hover:bg-brand-300 disabled:opacity-60"
              >
                {pdfBusy ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                Merge PDFs
              </button>
              <button
                onClick={splitPdf}
                disabled={pdfBusy}
                className="surface inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium text-mist-100 transition hover:text-brand-300 disabled:opacity-60"
              >
                Split PDF
              </button>
              <button
                onClick={optimisePdf}
                disabled={pdfBusy}
                className="surface inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium text-mist-100 transition hover:text-brand-300 disabled:opacity-60"
              >
                Optimise (re-save) PDF
              </button>
              {pdfFiles.length > 0 ? (
                <button
                  onClick={() => {
                    setPdfFiles([]);
                    setPdfOutputs([]);
                    setPdfError(null);
                  }}
                  className="px-3 py-3 text-sm text-mist-400 hover:text-mist-100"
                >
                  Clear all
                </button>
              ) : null}
            </div>

            {pdfError ? (
              <p className="flex items-start gap-2 rounded-2xl border border-accent-500/40 bg-accent-500/10 p-4 text-mist-100">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                {pdfError}
              </p>
            ) : null}
            <OutputList outputs={pdfOutputs} />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div
              {...dropProps(addImages)}
              onClick={() => imgInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border border-dashed border-mist-100/25 p-10 text-center transition hover:border-brand-400/60"
            >
              <Upload className="mx-auto h-10 w-10 text-mist-400" />
              <p className="mt-3 font-medium text-mist-100">
                Drop images here, or click to choose
              </p>
              <p className="mt-1 text-sm text-mist-400">
                PNG, JPEG, WebP and other browser-supported images, up to 50 MB each.
              </p>
              <input
                ref={imgInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) addImages([...e.target.files]);
                  e.target.value = "";
                }}
              />
            </div>

            {imgFiles.length > 0 ? (
              <ul className="space-y-2">
                {imgFiles.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="surface flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                    <span className="flex items-center gap-3 truncate">
                      <ImageIcon className="h-5 w-5 shrink-0 text-mist-400" />
                      <span className="truncate text-mist-100">{f.name}</span>
                      <span className="shrink-0 text-sm text-mist-400">{formatBytes(f.size)}</span>
                    </span>
                    <button
                      aria-label={`Remove ${f.name}`}
                      onClick={() => setImgFiles((prev) => prev.filter((_, j) => j !== i))}
                      className="shrink-0 text-mist-400 hover:text-accent-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="surface grid gap-5 rounded-2xl p-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="img-quality" className="font-medium text-mist-100">
                  Quality: {quality}%
                </label>
                <input
                  id="img-quality"
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mt-3 w-full accent-[#d4ff3a]"
                />
                <p className="mt-1 text-sm text-mist-400">Ignored for PNG output.</p>
              </div>
              <div>
                <label htmlFor="img-width" className="font-medium text-mist-100">Width (px)</label>
                <input
                  id="img-width"
                  type="number"
                  min={1}
                  max={12000}
                  placeholder="Original"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-mist-100/15 bg-ink-950/60 px-4 py-3 text-mist-100 outline-none placeholder:text-mist-500"
                />
              </div>
              <div>
                <label htmlFor="img-height" className="font-medium text-mist-100">Height (px)</label>
                <input
                  id="img-height"
                  type="number"
                  min={1}
                  max={12000}
                  placeholder="Original"
                  value={targetHeight}
                  onChange={(e) => setTargetHeight(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-mist-100/15 bg-ink-950/60 px-4 py-3 text-mist-100 outline-none placeholder:text-mist-500"
                />
              </div>
              <div>
                <label htmlFor="img-format" className="font-medium text-mist-100">Output format</label>
                <select
                  id="img-format"
                  value={outFormat}
                  onChange={(e) => setOutFormat(e.target.value as "webp" | "jpeg" | "png")}
                  className="mt-2 w-full rounded-xl border border-mist-100/15 bg-ink-950/60 px-4 py-3 text-mist-100 outline-none"
                >
                  <option value="webp">WebP</option>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                </select>
                <label className="mt-3 flex items-center gap-2 text-sm text-mist-300">
                  <input
                    type="checkbox"
                    checked={lockAspect}
                    onChange={(e) => setLockAspect(e.target.checked)}
                    className="accent-[#d4ff3a]"
                  />
                  Keep aspect ratio
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={processImages}
                disabled={imgBusy}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-400 px-5 py-3 font-medium text-ink-950 transition hover:bg-brand-300 disabled:opacity-60"
              >
                {imgBusy ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                Process images
              </button>
              {imgFiles.length > 0 ? (
                <button
                  onClick={() => {
                    setImgFiles([]);
                    setImgOutputs([]);
                    setImgError(null);
                  }}
                  className="px-3 py-3 text-sm text-mist-400 hover:text-mist-100"
                >
                  Clear all
                </button>
              ) : null}
            </div>

            {imgError ? (
              <p className="flex items-start gap-2 rounded-2xl border border-accent-500/40 bg-accent-500/10 p-4 text-mist-100">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                {imgError}
              </p>
            ) : null}
            <OutputList outputs={imgOutputs} />
          </div>
        )}
      </Container>
    </>
  );
}

function OutputList({ outputs }: { outputs: Output[] }) {
  if (outputs.length === 0) return null;
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2 font-medium text-mist-100">
        <CheckCircle2 className="h-5 w-5 text-brand-400" />
        Ready to download
      </p>
      {outputs.map((o) => (
        <div key={o.name} className="surface flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3">
          <span>
            <span className="block truncate text-mist-100">{o.name}</span>
            <span className="text-sm text-mist-400">{o.note}</span>
          </span>
          <button
            onClick={() => downloadBlob(o.blob, o.name)}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-400 px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-brand-300"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      ))}
    </div>
  );
}
