interface EyebrowProps {
  text: string;
  center?: boolean;
}

export default function Eyebrow({ text, center = false }: EyebrowProps) {
  return (
    <p
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
