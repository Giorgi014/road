import { forwardRef } from "react";

interface HeroVideoProps {
  src?: string;
  fallbackImage?: string;
}

const HeroVideo = forwardRef<HTMLVideoElement, HeroVideoProps>(
  ({ src, fallbackImage }, ref) => {
    return (
      <>
        <video
          ref={ref}
          src={src}
          muted
          autoPlay
          playsInline
          preload="auto"
          poster={fallbackImage}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{ display: src ? "block" : "none" }}
        />
        {!src && fallbackImage && (
          <div
            className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${fallbackImage})`,
            }}
          />
        )}
      </>
    );
  },
);

HeroVideo.displayName = "HeroVideo";

export default HeroVideo;
