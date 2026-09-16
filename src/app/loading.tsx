export default function Loading() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <span
        aria-hidden
        className="block h-3 w-32 overflow-hidden border-2 border-mist-100/20"
      >
        <span className="animate-loading-bar block h-full w-full origin-left bg-brand-400" />
      </span>
      <p className="font-mono text-[11px] font-black tracking-[0.2em] text-mist-500 uppercase">
        Loading
      </p>
    </div>
  );
}
