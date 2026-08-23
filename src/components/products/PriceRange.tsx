export const PriceRange = () => {
  return (
    <article className="w-full my-5">
      <p className="uppercase text-sm font-sans text-(--ink)">price range</p>
      <input type="range" name="range" id="range" className="w-full" />
      <section className="w-full flex justify-between items-center">
        <p className="text-sm font-sans text-(--ink)">$50</p>
        <p className="text-sm font-sans text-(--ink)">$1000</p>
      </section>
    </article>
  );
};
