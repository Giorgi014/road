import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FOOTER } from "../../../data/content";
import { Link } from "react-router-dom";
import { Form } from "./Form";
import { BgCircle } from "@/components/ui/BgCircle";

const CONTACT_ICONS = [Mail, Phone, MapPin];

export const Footer = () => {
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
      className="relative overflow-hidden border-t border-ink-400 bg-ink-900 pt-15 pb-5"
    >
      <BgCircle />
      <article className="relative mx-auto max-w-[1600px] px-6">
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white">
              <span className="block">{FOOTER.headlineTop}</span>
              <span className="text-gradient-blue block">
                {FOOTER.headlineBottom}
              </span>
            </h2>
            <Form
              submit={submit}
              email={email}
              sent={sent}
              setEmail={setEmail}
            />
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
                    className="flex items-center gap-3 text-white/70 transition-colors hover:text-white text-sm cursor-pointer"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-400 bg-ink-800/70 text-electric-300 backdrop-blur-xl">
                      <Icon size={15} strokeWidth={1.8} />
                    </span>
                    {c.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="mt-5 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-5 md:flex-row">
          <Link to={"/"}>
            <h2 className="font-display text-2xl font-bold text-white">ROAD</h2>
          </Link>
          <ul className="m-0 flex list-none flex-wrap items-center gap-6 p-0">
            {FOOTER.legal.map((l) => (
              <Link
                to={"#"}
                key={l}
                className="text-[10px] uppercase tracking-[0.35em] text-white/30 transition-colors hover:text-white/70 no-underline"
              >
                {l}
              </Link>
            ))}
          </ul>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
            © 2026 Road Systems
          </p>
        </section>
      </article>
    </footer>
  );
};
