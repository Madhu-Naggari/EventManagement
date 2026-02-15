import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { useEffect, useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import API from "@/services/api";
import Cookies from "js-cookie";
import Footer from "@/components/footer";
import { MapPin, CalendarDays, Tag } from "lucide-react";
import { LoaderOne } from "@/components/ui/loader";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NavbarDemo } from "@/components/Navbar";

const EventDetails = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const {
    selectedEvent,
    fetchEventById,
    loading,
    updateEvent,
    deleteEvent,
    error,
  } = useEvents();

  const { registerEvent, cancelRegistration } = useRegistration();

  const [isRegistered, setIsRegistered] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const userCookie = Cookies.get("user");
  const parsedUser = userCookie ? JSON.parse(userCookie) : null;

  const isOwner =
    parsedUser &&
    (parsedUser._id === selectedEvent?.createdBy ||
      parsedUser._id === selectedEvent?.createdBy?._id);

  useEffect(() => {
    if (!eventId) return;

    async function loadData() {
      try {
        await fetchEventById(eventId);

        const { data } = await API.get(`/api/registrations/check/${eventId}`);
        setIsRegistered(data.isRegistered);
      } catch (err) {
        console.error("Error loading event:", err);
      }
    }

    loadData();
  }, [eventId]);

  const handleRegister = async () => {
    try {
      await registerEvent(eventId);
      setIsRegistered(true);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelRegistration(eventId);
      setIsRegistered(false);
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  const handleEditSave = async () => {
    try {
      await updateEvent(editData._id, editData);
      await fetchEventById(editData._id);
      setEditOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEvent(selectedEvent._id);
      setDeleteOpen(false);
      navigate("/my-events");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ---------------- SAFE RENDER GUARD ---------------- */

  if (loading || !selectedEvent) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderOne />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <div>
      <NavbarDemo />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight">
            {selectedEvent.name}
          </h1>

          {/* Image */}
          {selectedEvent.image?.url && (
            <img
              src={selectedEvent.image.url}
              alt="event"
              className="w-full h-72 object-cover rounded-xl border shadow-sm"
            />
          )}

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed">
            {selectedEvent.description}
          </p>

          {/* Info Section */}
          <div className="grid sm:grid-cols-3 gap-6 bg-muted/40 p-6 rounded-xl border">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{selectedEvent.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{selectedEvent.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {new Date(selectedEvent.date).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* OWNER / USER ACTIONS */}
          {isOwner ? (
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setEditData(selectedEvent);
                  setEditOpen(true);
                }}
              >
                Edit
              </Button>

              <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                Delete
              </Button>
            </div>
          ) : isRegistered ? (
            <Button variant="outline" onClick={handleCancel}>
              Cancel Registration
            </Button>
          ) : (
            <Button onClick={handleRegister}>Register Now</Button>
          )}

          {/* EDIT DIALOG */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
              </DialogHeader>

              {editData && (
                <div className="space-y-4">
                  <Input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />

                  <Textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />

                  <Input
                    value={editData.location}
                    onChange={(e) =>
                      setEditData({ ...editData, location: e.target.value })
                    }
                  />

                  <Input
                    type="date"
                    value={editData.date?.split("T")[0]}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditSave}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* DELETE DIALOG */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Event</DialogTitle>
              </DialogHeader>

              <p className="text-sm text-muted-foreground">
                This action cannot be undone.
              </p>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetails;
