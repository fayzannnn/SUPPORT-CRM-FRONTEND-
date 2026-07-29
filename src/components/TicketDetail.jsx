import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, updateTicket } from "../api/api";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const res = await getTicketById(id);
      setTicket(res.data);
    } catch (err) {
      setError("Ticket not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await updateTicket(id, { status: newStatus });
      setTicket(res.data);
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  const handleAddNote = async () => {
    if (!note.trim()) return;
    try {
      const res = await updateTicket(id, { note });
      setTicket(res.data);
      setNote("");
    } catch (err) {
      setError("Failed to add note.");
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p className="error">{error}</p></div>;
  if (!ticket) return null;

  return (
    <div className="container">
      <span className="back-link" onClick={() => navigate("/")}>
        ← Back to all tickets
      </span>

      <div className="card">
        <h2>
          {ticket.ticketId} — {ticket.title}
        </h2>
        <p style={{ color: "#9aa0ac", marginBottom: 16 }}>
          {ticket.customerName} ({ticket.customerEmail})
        </p>
        <p style={{ marginBottom: 16 }}>{ticket.description}</p>

        <div className="form-group">
          <label>Status</label>
          <select
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <p style={{ fontSize: 12, color: "#666c78" }}>
          Created: {new Date(ticket.createdAt).toLocaleString()} | Updated:{" "}
          {new Date(ticket.updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="card">
        <h2>Notes / Comments</h2>
        {ticket.notes.length === 0 && (
          <p style={{ color: "#666c78" }}>No notes yet.</p>
        )}
        {ticket.notes.map((n, i) => (
          <div className="note-item" key={i}>
            {n.text}
            <div className="note-date">
              {new Date(n.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
        <div className="form-group" style={{ marginTop: 16 }}>
          <label>Add a note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add an update or comment..."
          />
        </div>
        <button onClick={handleAddNote}>Add Note</button>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}
