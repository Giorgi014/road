import { SIZES } from "@/data/content";

export const Size = () => {
  return (
    <article className="w-full">
      <p className="uppercase text-sm font-sans text-(--ink)">size</p>
      <section className="w-full flex gap-2.5 flex-wrap mt-2.5">
        {SIZES.map((item) => (
          <div
            key={item.id}
            className="flex justify-center items-center w-10 h-7 border border-electric-400/60 cursor-pointer hover:shadow-[0_0_5px_0px_var(--violet)]"
          >
            <span>{item.size}</span>
          </div>
        ))}
      </section>
    </article>
  );
};
