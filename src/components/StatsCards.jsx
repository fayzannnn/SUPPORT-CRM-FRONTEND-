const CARD_CONFIG = [
  { key: "All", label: "Total Tickets", color: "#4f8cff" },
  { key: "Open", label: "Open", color: "#4f8cff" },
  { key: "In Progress", label: "In Progress", color: "#ffb84f" },
  { key: "Closed", label: "Closed", color: "#4fff8c" },
];

export default function StatsCards({ counts, activeFilter, onSelect }) {
  return (
    <div className="stats-grid">
      {CARD_CONFIG.map((c) => (
        <div
          key={c.key}
          className={`stat-card ${activeFilter === c.key ? "active" : ""}`}
          style={{ "--accent": c.color }}
          onClick={() => onSelect(c.key)}
        >
          <div className="stat-number">{counts[c.key] ?? 0}</div>
          <div className="stat-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
