import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myEvents, setMyEvents] = useState([]); // always array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ✅ Load registered events
  const loadMyEvents = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/api/registrations/my-events");

      // Ensure it's always an array
      setMyEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load registered events";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Select event
  const selectEvent = (event) => {
    if (!event?._id) return;
    setSelectedEvent(event);
    navigate(`/events/${event._id}`);
  };

  // Register event
  const registerEvent = async (eventId) => {
    if (!eventId) return;

    setLoading(true);
    try {
      await API.post(`/api/registrations/${eventId}`);

      toast.success("Registered successfully!");

      // 🔥 Always reload from backend (single source of truth)
      await loadMyEvents();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to register";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel registration
  const cancelRegistration = async (eventId) => {
    if (!eventId) return;

    setLoading(true);
    try {
      await API.delete(`/api/registrations/${eventId}`);

      toast.success("Registration cancelled");

      // 🔥 Reload instead of manual filter
      await loadMyEvents();
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to cancel registration";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        selectedEvent,
        selectEvent,
        myEvents,
        loadMyEvents,
        registerEvent,
        cancelRegistration,
        loading,
        error,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
