import { forwardRef } from "react";

interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
}

const HeroVideo = forwardRef<HTMLVideoElement, HeroVideoProps>(
  ({ src }, ref) => {
    return (
      <video
        ref={ref}
        src={src}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
    );
  },
);

HeroVideo.displayName = "HeroVideo";

export default HeroVideo;
