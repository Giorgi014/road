import type { PriceRangeProps } from "@/types";
import { useState } from "react";

export const PriceRange = ({
  min = 50,
  max = 1000,
  step = 10,
  defaultMin = 50,
  defaultMax = 500,
  onChange,
}: PriceRangeProps) => {
  const [minVal, setMinVal] = useState(defaultMin);
  const [maxVal, setMaxVal] = useState(defaultMax);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
    onChange?.([value, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
    onChange?.([minVal, value]);
  };

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <article className="w-full my-5">
      <p className="uppercase text-sm tracking-(--tracking-ultra) font-display text-(--ink) mb-6">
        price range
      </p>

      <section className="relative h-5 flex items-center">
        <div className="absolute w-full h-[2px] rounded-full bg-(--surface-light)" />
        <div
          className="absolute h-[2px] rounded-full bg-(--primary)"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="range-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="range-thumb"
        />
      </section>
      <section className="w-full flex justify-between items-center mt-3">
        <p className="text-sm font-sans text-(--ink)">${minVal}</p>
        <p className="text-sm font-sans text-(--ink)">${maxVal}</p>
      </section>
    </article>
  );
};
