import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTicketPage from "./pages/CreateTicketPage";
import TicketPage from "./pages/TicketPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTicketPage />} />
        <Route path="/ticket/:id" element={<TicketPage />} />
      </Routes>
    </BrowserRouter>
  );
}
