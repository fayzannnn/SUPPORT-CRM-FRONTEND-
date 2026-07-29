import { Link } from "react-router-dom";
import TicketList from "../components/TicketList";

export default function Home() {
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ marginBottom: 4 }}>All Tickets</h2>
          <p style={{ color: "#9aa0ac", fontSize: 13 }}>
            Search, filter, and manage customer support tickets.
          </p>
        </div>
        <Link to="/create">
          <button>+ New Ticket</button>
        </Link>
      </div>

      <TicketList />
    </div>
  );
}
