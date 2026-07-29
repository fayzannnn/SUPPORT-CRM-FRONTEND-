import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../api/api";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTickets({ search, status });
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  // debounced search-as-you-type + refetch whenever status changes
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTickets();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchTickets]);

  // refetch when user comes back to this tab/page (e.g. after creating a ticket)
  useEffect(() => {
    const onFocus = () => fetchTickets();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchTickets]);

  return (
    <div className="card">
      <div className="toolbar">
        <input
          placeholder="Search by name, email, ID, or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <div className="empty-state">No tickets found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id} onClick={() => navigate(`/ticket/${t._id}`)}>
                <td>{t.ticketId}</td>
                <td>{t.customerName}</td>
                <td>{t.title}</td>
                <td>
                  <span className={`badge ${t.status.replace(" ", "-")}`}>
                    {t.status}
                  </span>
                </td>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
