import { Button } from "@/components/ui/Button";
import type { FooterFormProps } from "@/types";

export const Form = ({ submit, email, sent, setEmail }: FooterFormProps) => {
  return (
    <form onSubmit={submit} className="w-full mt-10 max-w-md overflow-hidden">
      <section className="flex items-center gap-2 rounded-full border border-ink-400 bg-ink-800/70 p-1.5 backdrop-blur-xl focus-within:border-electric-400">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border-none bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/30"
        />
        <Button href="#subscribe" label="Subscribe" />
      </section>
      {sent && (
        <p className="mt-3 text-xs text-electric-300">
          You're on the list. Welcome to the road.
        </p>
      )}
    </form>
  );
};
