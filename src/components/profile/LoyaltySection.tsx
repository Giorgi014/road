import { RANKS } from "@/data";
import championRank from "@/assets/img/ranks/champion.webp";
import explorerRank from "@/assets/img/ranks/explorer.webp";
import hunterRank from "@/assets/img/ranks/hunter.webp";
import legendRank from "@/assets/img/ranks/legeng.webp";
import rookieRank from "@/assets/img/ranks/rookie.webp";
import grayChampionRank from "@/assets/img/ranks/gray-champion.webp";
import grayExplorerRank from "@/assets/img/ranks/gray-explorer.webp";
import grayHunterRank from "@/assets/img/ranks/gray-hunter.webp";
import grayLegendRank from "@/assets/img/ranks/gray-legeng.webp";
import grayRookieRank from "@/assets/img/ranks/gray-rookie.webp";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

interface LoyaltySectionProps {
  currentXP?: number;
}

const cssVars = (vars: Record<string, string>) => vars as CSSProperties;

const rankImages: Record<string, { unlocked: string; locked: string }> = {
  Rookie: { unlocked: rookieRank, locked: grayRookieRank },
  Explorer: { unlocked: explorerRank, locked: grayExplorerRank },
  Hunter: { unlocked: hunterRank, locked: grayHunterRank },
  Champion: { unlocked: championRank, locked: grayChampionRank },
  Legend: { unlocked: legendRank, locked: grayLegendRank },
};

export const LoyaltySection = ({ currentXP = 15000 }: LoyaltySectionProps) => {
  const xp = Math.max(0, Math.floor(currentXP));

  const currentRankIndex = RANKS.findIndex(
    (rank) => xp >= rank.minXP && (rank.maxXP === null || xp <= rank.maxXP),
  );

  const currentRank = RANKS[currentRankIndex];
  const nextRank = RANKS[currentRankIndex + 1];

  const progress = nextRank
    ? ((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100
    : 100;

  const xpToNext = nextRank ? nextRank.minXP - xp : 0;

  return (
    <section
      style={cssVars({
        "--rank": currentRank.color,
        "--next-rank": nextRank?.color ?? currentRank.color,
        "--progress": `${progress}%`,
      })}
      className="relative flex h-full min-h-95 w-full flex-col gap-6 overflow-hidden rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6"
    >
      <div className="flex w-full items-center justify-between">
        <ol className="list-disc pl-5 uppercase marker:text-electric-300">
          <li className="text-xs tracking-ultra">Loyalty Progress</li>
        </ol>

        <Link
          to="/ranks"
          className="flex items-center gap-2 text-xs uppercase tracking-ultra text-electric-300 transition-colors hover:text-white"
        >
          View Tiers
          <ArrowRight size={16} strokeWidth={1.6} />
        </Link>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 sm:flex-row sm:gap-7">
        <div className="relative size-40 shrink-0 rounded-full bg-[conic-gradient(from_-90deg,var(--rank)_var(--progress),#111B3D_var(--progress))] p-1.75 shadow-[0_0_25px_color-mix(in_srgb,var(--rank)_15%,transparent)] sm:size-44">
          <div className="flex size-full flex-col items-center justify-center rounded-full bg-ink-900">
            <span className="font-display text-2xl text-white sm:text-3xl">
              {xp.toLocaleString("en-US")}
            </span>

            <span className="mt-1 text-xs uppercase tracking-ultra text-white/50">
              XP
            </span>
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-4">
          <div>
            <p className="font-display text-sm uppercase tracking-wide text-(--rank) sm:text-base">
              {currentRank.name}
            </p>

            {nextRank ? (
              <>
                <p className="mt-2 text-sm text-white/50">
                  Next level:{" "}
                  <span className="font-medium uppercase text-(--next-rank)">
                    {nextRank.name}
                  </span>
                </p>

                <p className="mt-1 text-sm text-white/50">
                  {xpToNext.toLocaleString("en-US")} XP to go
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-white/50">
                Maximum rank unlocked!
              </p>
            )}
          </div>

          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-ink-900">
            <div className="h-full w-(--progress) rounded-full bg-linear-to-r from-(--rank)/80 to-(--rank) shadow-[0_0_15px_color-mix(in_srgb,var(--rank)_50%,transparent)] transition-all duration-700 ease-out" />
          </div>

          <p className="text-xs leading-relaxed text-white/45 sm:text-sm">
            Earn XP with every purchase and unlock exclusive rewards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 border-t border-white/10 pt-4">
        {RANKS.map((rank) => {
          const isUnlocked = xp >= rank.minXP;

          return (
            <div
              key={rank.name}
              style={cssVars({ "--rank": rank.color })}
              className="flex min-w-0 flex-col items-center gap-2"
            >
              <div className="flex size-10 items-center justify-center rounded-lg transition-all duration-300 sm:size-12">
                <img
                  src={
                    isUnlocked
                      ? rankImages[rank.name].unlocked
                      : rankImages[rank.name].locked
                  }
                  alt={`${rank.name} rank`}
                  className="size-full object-contain transition-transform duration-300"
                  draggable={false}
                />
              </div>

              <span
                className={`truncate text-[8px] font-semibold uppercase tracking-wider transition-colors sm:text-[10px] ${
                  isUnlocked ? "text-(--rank)" : "text-white/35"
                }`}
              >
                {rank.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
