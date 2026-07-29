import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";

export default function CreateTicketPage() {
  const navigate = useNavigate();

  const handleCreated = () => {
    // brief pause so the success message is visible, then go back to list
    setTimeout(() => navigate("/"), 800);
  };

  return (
    <div className="container">
      <span className="back-link" onClick={() => navigate("/")}>
        ← Back to all tickets
      </span>
      <TicketForm onCreated={handleCreated} />
    </div>
  );
}
