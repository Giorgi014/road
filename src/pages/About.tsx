import { HeroSection } from "@/components/hero";
import { ABOUT_HERO_COPY } from "@/data";
import About_Cover from "@/assets/img/road-img.webp";
import { Timeline, FeatureCards } from "@/components";

const About = () => {
  return (
    <main className="w-full bg-ink-900">
      <HeroSection
        copy={ABOUT_HERO_COPY}
        media={{ type: "image", src: About_Cover }}
        className="min-h-[560px]"
      />
      <article className="mx-auto w-full max-w-[1600px] px-6 py-16 md:py-24">
        <FeatureCards />
        <Timeline />
      </article>
    </main>
  );
};

export default About;
