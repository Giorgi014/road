import { useGSAP } from "@gsap/react";
import { Mail, Pencil, Tag, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { gsap } from "@/lib";

export const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const form = formRef.current;
      const title = titleRef.current;
      const button = buttonRef.current;
      const fields = fieldRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (!form || !title || !button) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: form,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        form,
        { x: 50, opacity: 0, scale: 0.97 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power4.out",
          clearProps: "transform,opacity",
        },
        0,
      )
        .fromTo(
          title,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.4,
        )
        .fromTo(
          fields,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          0.55,
        )
        .fromTo(
          button,
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.6)",
            clearProps: "transform,opacity",
          },
          ">-0.3",
        );
    },
    { scope: formRef },
  );

  return (
    <form
      ref={formRef}
      className="w-full max-w-xl space-y-6 rounded-4xl border border-white/10 bg-[rgba(7,16,43,0.72)] p-5 shadow-(--shadow-soft) backdrop-blur-xl sm:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }}
    >
      <h2
        ref={titleRef}
        className="text-2xl font-medium text-white sm:text-3xl"
      >
        Send us a message
      </h2>

      <section className="grid gap-5 sm:grid-cols-2">
        <div
          ref={(el) => {
            fieldRefs.current[0] = el;
          }}
          className="space-y-2"
        >
          <label
            htmlFor="your-name"
            className="block pl-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40"
          >
            Your Name
          </label>
          <div className="flex items-center gap-3 rounded-full border border-ink-400 bg-ink-800/70 px-4 py-3 transition-colors focus-within:border-electric-400">
            <UserRound size={16} className="text-white/50" />
            <input
              id="your-name"
              type="text"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
        </div>

        <div
          ref={(el) => {
            fieldRefs.current[1] = el;
          }}
          className="space-y-2"
        >
          <label
            htmlFor="email-address"
            className="block pl-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40"
          >
            Email Address
          </label>
          <div className="flex items-center gap-3 rounded-full border border-ink-400 bg-ink-800/70 px-4 py-3 transition-colors focus-within:border-electric-400">
            <Mail size={16} className="text-white/50" />
            <input
              id="email-address"
              type="email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
        </div>
      </section>

      <div
        ref={(el) => {
          fieldRefs.current[2] = el;
        }}
        className="space-y-2"
      >
        <label
          htmlFor="subject"
          className="block pl-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40"
        >
          Subject
        </label>
        <div className="flex items-center gap-3 rounded-full border border-ink-400 bg-ink-800/70 px-4 py-3 transition-colors focus-within:border-electric-400">
          <Tag size={16} className="text-white/50" />
          <input
            id="subject"
            type="text"
            name="subject"
            required
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="What is this about?"
            className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
        </div>
      </div>

      <div
        ref={(el) => {
          fieldRefs.current[3] = el;
        }}
        className="space-y-2"
      >
        <label
          htmlFor="message"
          className="block pl-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40"
        >
          Message
        </label>
        <div className="flex gap-3 rounded-3xl border border-ink-400 bg-ink-800/70 px-4 py-3 transition-colors focus-within:border-electric-400">
          <Pencil size={16} className="mt-1 shrink-0 text-white/50" />
          <textarea
            id="message"
            rows={5}
            name="message"
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your message here."
            className="w-full resize-none border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
        </div>
      </div>

      <button
        ref={buttonRef}
        type="submit"
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-(image:--pill-grad) px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-[box-shadow] duration-300 hover:shadow-[0_0_60px_-8px_var(--blue-glow)] cursor-pointer"
      >
        Send message
      </button>
      {sent && (
        <p role="status" className="text-center text-sm text-electric-300">
          Message prepared successfully.
        </p>
      )}
    </form>
  );
};
