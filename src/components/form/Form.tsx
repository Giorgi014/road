import { Mail, Pencil, Tag, UserRound } from "lucide-react";

export const Form = () => {
  return (
    <form
      className="w-full max-w-xl space-y-6 rounded-4xl border border-white/10 bg-[rgba(7,16,43,0.72)] p-5 shadow-(--shadow-soft) backdrop-blur-xl sm:p-7"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl font-medium text-white sm:text-3xl">
        Send us a message
      </h2>

      <section className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
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
              placeholder="Enter your name"
              className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
        </div>

        <div className="space-y-2">
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
              placeholder="Enter your email"
              className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
        </div>
      </section>

      <div className="space-y-2">
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
            placeholder="What is this about?"
            className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="space-y-2">
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
            placeholder="Write your message here."
            className="w-full resize-none border-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-(image:--pill-grad) px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_0_60px_-8px_var(--blue-glow)] cursor-pointer"
      >
        Send message
      </button>
    </form>
  );
};
