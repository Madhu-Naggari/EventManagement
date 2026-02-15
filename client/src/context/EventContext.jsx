import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import API from "@/services/api";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]); // all events
  const [myCreatedEvents, setMyCreatedEvents] = useState([]); // all events
  const [selectedEvent, setSelectedEvent] = useState(null); // for single event details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/api/events`);
      setEvents(data.events || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load events");
      toast.error(err.response?.data?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const myOwnEvents = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/api/events/my-events`);
      setMyCreatedEvents(data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load events");
      toast.error(err.response?.data?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch event by ID
  const fetchEventById = async (id) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/api/events/${id}`);
      setSelectedEvent(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load event details");
      toast.error(
        err.response?.data?.message || "Failed to load event details",
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch events by filters
  const fetchEventsByFilters = async (filters) => {
    setLoading(true);
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined,
        ),
      );

      const query = new URLSearchParams(filteredParams).toString();
      const { data } = await API.get(`/api/events?${query}`);
      console.log(query);
      setEvents(data.events || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch filtered events",
      );
      toast.error(
        err.response?.data?.message || "Failed to fetch filtered events",
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create new event
  const createEvent = async (eventData) => {
    setLoading(true);
    try {
      const { data } = await API.post(`/api/events/`, eventData);
      setEvents((prev) => [...prev, data.event]);
      toast.success("Event created successfully");
      myOwnEvents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
      toast.error(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update event
  const updateEvent = async (id, eventData) => {
    setLoading(true);
    try {
      const { data } = await API.put(`/api/events/${id}`, eventData);
      setEvents((prev) => prev.map((e) => (e._id === id ? data.event : e)));
      toast.success("Event updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event");
      toast.error(err.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete event
  const deleteEvent = async (id) => {
    setLoading(true);
    try {
      await API.delete(`/api/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
      toast.error(err.response?.data?.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        loading,
        error,
        myCreatedEvents,
        fetchEvents,
        myOwnEvents,
        fetchEventById,
        fetchEventsByFilters,
        createEvent,
        updateEvent,
        deleteEvent,
        setSelectedEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Hook to use the Event context
export const useEvents = () => useContext(EventContext);
