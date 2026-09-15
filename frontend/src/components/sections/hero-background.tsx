export function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[rgba(30,42,90,0.08)] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute right-0 top-32 -z-10 h-72 w-72 rounded-full bg-[var(--surface)] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute left-0 bottom-0 -z-10 h-64 w-64 rounded-full bg-[rgba(76,175,80,0.08)] blur-3xl"
      />
    </>
  );
}