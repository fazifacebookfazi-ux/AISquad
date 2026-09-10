"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Karachi",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Wall clock for the studio — PKT, no flash of a server timezone. */
export function StudioClock() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setLabel(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!label) {
    return (
      <span className="hidden w-[7.5rem] font-mono text-[11px] tracking-[0.16em] text-mist-500 uppercase sm:inline">
        PKT ——:——
      </span>
    );
  }

  return (
    <time
      dateTime={label}
      className="hidden font-mono text-[11px] tracking-[0.16em] text-mist-500 tabular-nums uppercase sm:inline"
    >
      PKT {label}
    </time>
  );
}
