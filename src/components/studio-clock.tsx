"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Karachi",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Wall clock for the studio — PKT, reserved width so the nav does not jump. */
export function StudioClock() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => setLabel(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      dateTime={label || undefined}
      suppressHydrationWarning
      className="hidden w-[7.25rem] font-mono text-[11px] tracking-[0.16em] text-mist-500 tabular-nums uppercase sm:inline"
    >
      PKT {label || "——:——"}
    </time>
  );
}
