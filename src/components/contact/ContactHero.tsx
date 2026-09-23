import { CONTACT_PAGE } from "@/data/content";
import { Form } from "../form/Form";
import Eyebrow from "../ui/Eyebrow";

export const ContactHero = () => {
  return (
    <section className="md:flex justify-between items-start gap-5">
      <div className="w-full md:max-w-xl">
        <Eyebrow text={CONTACT_PAGE.eyebrow} />
        <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-white uppercase">
          <span className="block">{CONTACT_PAGE.headlineTop}</span>
          <span className="text-gradient-blue block">
            {CONTACT_PAGE.headlineBottom}
          </span>
        </h2>
        <p className="mt-8 w-full md:max-w-105 text-base leading-7 text-(--ink-dim)">
          {CONTACT_PAGE.paragraph}
        </p>
      </div>
      <div className="w-full md:mt-0 mt-5 flex justify-center items-center">
        <Form />
      </div>
    </section>
  );
};
