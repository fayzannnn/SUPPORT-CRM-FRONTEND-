import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const createTicket = (data) => api.post("/tickets", data);

export const getTickets = (params) => api.get("/tickets", { params });

export const getTicketById = (id) => api.get(`/tickets/${id}`);

export const updateTicket = (id, data) => api.put(`/tickets/${id}`, data);

export default api;
