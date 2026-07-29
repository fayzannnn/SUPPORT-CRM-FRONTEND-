import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets, deleteTicket } from "../api/api";

// status: controlled from parent (Home) so stat cards can drive the filter.
// onDataChange: reports the fetched tickets back up so Home can compute stat counts.
export default function TicketList({ status, onDataChange }) {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTickets({ search, status });
      setTickets(res.data);
      if (onDataChange) onDataChange(res.data, { search, status });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTickets();
    }, 300); // debounce search-as-you-type
    return () => clearTimeout(delay);
  }, [fetchTickets]);

  useEffect(() => {
    const onFocus = () => fetchTickets();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchTickets]);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // don't trigger row navigation
    if (!window.confirm("Delete this ticket? This can't be undone.")) return;
    try {
      await deleteTicket(id);
      fetchTickets();
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <div className="toolbar">
        <input
          placeholder="Search by name, email, ID, or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
              <th></th>
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
                <td>
                  <button
                    onClick={(e) => handleDelete(e, t._id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ff6b6b",
                      fontSize: 16,
                      cursor: "pointer",
                      padding: "4px 8px",
                    }}
                    title="Delete ticket"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}