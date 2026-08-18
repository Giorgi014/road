import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { FOOTER } from "../../data/content";

const CONTACT_ICONS = [Mail, Phone, MapPin];

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer
      id="marketplace"
      className="relative overflow-hidden border-t border-white/5 bg-[#05070f] pb-16 pt-20"
    >
      <div className="pointer-events-none absolute left-[33%] top-[-160px] h-[500px] w-[500px] rounded-full bg-[#2a44e6]/[0.15] blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white">
              <span className="block">{FOOTER.headlineTop}</span>
              <span className="text-gradient-blue block">
                {FOOTER.headlineBottom}
              </span>
            </h2>
            <form onSubmit={submit} className="mt-10 max-w-[448px]">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl focus-within:border-[#4d6eff]/40">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 border-none bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#3b5bff_0%,#6c4dff_100%)] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-shadow hover:shadow-[0_0_40px_-10px_rgba(77,110,255,0.6)]"
                >
                  Subscribe
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={12} />
                  </span>
                </button>
              </div>
              {sent && (
                <p className="mt-3 text-xs text-[#7f96ff]">
                  You're on the list. Welcome to the road.
                </p>
              )}
            </form>
          </div>
          <div className="lg:pl-8">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/40">
              Contact
            </p>
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {FOOTER.contacts.map((c, i) => {
                const Icon = CONTACT_ICONS[i];
                return (
                  <li
                    key={c.label}
                    className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#7f96ff] backdrop-blur-xl">
                      <Icon size={15} strokeWidth={1.8} />
                    </span>
                    <span className="text-sm">{c.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <div className="font-display text-2xl font-bold text-white">ROAD</div>
          <ul className="m-0 flex list-none flex-wrap items-center gap-6 p-0">
            {FOOTER.legal.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-[10px] uppercase tracking-[0.35em] text-white/30 transition-colors hover:text-white/70 no-underline"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
            © 2031 Road Systems
          </p>
        </div>
      </div>
    </footer>
  );
}
