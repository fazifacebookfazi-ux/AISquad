export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="font-mono text-[11px] tracking-[0.24em] text-mute uppercase">
        <span className="mr-3 inline-block size-2 animate-pulse rounded-full bg-accent" />
        Loading
      </p>
    </div>
  );
}
