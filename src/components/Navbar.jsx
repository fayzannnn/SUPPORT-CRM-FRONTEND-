import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      className="navbar"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1>
          Support <span>CRM</span>
        </h1>
      </Link>
      <Link to="/create" style={{ textDecoration: "none" }}>
        <button>+ New Ticket</button>
      </Link>
    </div>
  );
}
