import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import StatsCards from "../components/StatsCards";
import TicketList from "../components/TicketList";
import { getTickets } from "../api/api";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [counts, setCounts] = useState({
    All: 0,
    Open: 0,
    "In Progress": 0,
    Closed: 0,
  });

  // Fetch the FULL ticket list (no filters) just to compute stat counts.
  // This runs independently of whatever filter is applied to the list below.
  const fetchCounts = useCallback(async () => {
    try {
      const res = await getTickets({});
      const all = res.data;
      const next = { All: all.length, Open: 0, "In Progress": 0, Closed: 0 };
      all.forEach((t) => {
        if (next[t.status] !== undefined) next[t.status] += 1;
      });
      setCounts(next);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    const onFocus = () => fetchCounts();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchCounts]);

  // Keep stat counts fresh whenever the list below refetches (e.g. after a status update)
  const handleListData = () => {
    fetchCounts();
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ marginBottom: 4 }}>Dashboard</h2>
          <p style={{ color: "#9aa0ac", fontSize: 13 }}>
            Overview of all customer support tickets.
          </p>
        </div>
        <Link to="/create">
          <button>+ New Ticket</button>
        </Link>
      </div>

      <StatsCards
        counts={counts}
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
      />

      <TicketList status={activeFilter} onDataChange={handleListData} />
    </div>
  );
}
