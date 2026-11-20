import { useRef } from "react";
import { useScrollReveal } from "@/hooks";
import type { EyebrowProps } from "@/types";

export default function Eyebrow({
  text,
  center = false,
  delay = 0.3,
}: EyebrowProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useScrollReveal(ref, {
    from: { xPercent: -40, opacity: 0 },
    duration: 1.1,
    delay,
    start: "top 90%",
  });

  return (
    <p
      ref={ref}
      className={`mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-ultra text-electric-300 ${
        center ? "justify-center" : ""
      }`}
    >
      {!center && <span className="h-px w-8 bg-electric-500" />}
      {text}
      {center && <span className="h-px w-8 bg-electric-500" />}
    </p>
  );
}
