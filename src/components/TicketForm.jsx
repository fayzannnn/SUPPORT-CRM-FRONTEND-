import { useState } from "react";
import { createTicket } from "../api/api";

export default function TicketForm({ onCreated }) {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.customerName || !form.customerEmail || !form.title || !form.description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await createTicket(form);
      setSuccess(`Ticket ${res.data.ticketId} created successfully. Redirecting...`);
      setForm({ customerName: "", customerEmail: "", title: "", description: "" });
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label>Customer Email</label>
          <input
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group">
          <label>Issue Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Unable to login"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail..."
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Ticket"}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}
