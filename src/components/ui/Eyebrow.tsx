interface EyebrowProps {
  text: string;
  center?: boolean;
}

export default function Eyebrow({ text, center = false }: EyebrowProps) {
  return (
    <p
      className={`mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#7f96ff] ${
        center ? "justify-center" : ""
      }`}
    >
      {!center && <span className="h-px w-8 bg-[#4d6eff]" />}
      {text}
      {center && <span className="h-px w-8 bg-[#4d6eff]" />}
    </p>
  );
}
