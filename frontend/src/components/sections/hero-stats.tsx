const stats = [
  {
    value: "3",
    label: "Core Services",
  },
  {
    value: "100%",
    label: "Custom Solutions",
  },
  {
    value: "AI",
    label: "Powered Development",
  },
];

export function HeroStats() {
  return (
    <div className="mt-20 grid grid-cols-1 gap-8 border-t border-[var(--border)] pt-10 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-[var(--text-primary)]">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}