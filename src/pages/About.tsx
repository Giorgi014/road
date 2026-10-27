import { HeroSection } from "@/components/hero";
import { ABOUT_HERO_COPY } from "@/data";
import About_Cover from "@/assets/img/road-img.webp";

const About = () => {
  return (
    <main className="w-full bg-ink-900">
      <HeroSection
        copy={ABOUT_HERO_COPY}
        media={{ type: "image", src: About_Cover }}
        className="min-h-[560px]"
      />
    </main>
  );
};

export default About;
