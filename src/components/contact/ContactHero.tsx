import { CONTACT_HERO } from "@/data/content";
import { Form } from "../form/Form";

export const ContactHero = () => {
  return (
    <section>
      <div>
        <p>Lets Connect</p>
        <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white uppercase">
          <span className="block">{CONTACT_HERO.headlineTop}</span>
          <span className="text-gradient-blue block">
            {CONTACT_HERO.headlineBottom}
          </span>
        </h2>
      </div>
      <Form />
    </section>
  );
};
