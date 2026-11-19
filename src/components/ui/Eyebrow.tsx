import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { EyebrowProps } from "@/types";

export default function Eyebrow({
  text,
  center = false,
  delay = 0.3,
}: EyebrowProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { xPercent: -40, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

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
