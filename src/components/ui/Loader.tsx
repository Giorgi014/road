const RING_DELAYS = ["0s", "0.4s", "0.8s", "1.2s"];

export const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="relative size-40" role="status" aria-label="Loading">
        {RING_DELAYS.map((delay) => (
          <div
            key={delay}
            style={{ animationDelay: delay }}
            className="absolute inset-0 animate-warp-ring rounded-full border-2 border-primary/20 bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary)_15%,transparent)_30%,transparent_70%)] opacity-0 shadow-warp-ring"
          />
        ))}
        <div className="absolute inset-0 m-auto size-6 animate-core-pulse rounded-full bg-[radial-gradient(circle_at_center,var(--primary-light),var(--primary))] shadow-warp-core" />
      </div>
    </div>
  );
};
