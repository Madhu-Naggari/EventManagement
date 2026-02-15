"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import API from "@/services/api";
import { toast } from "sonner";
import { useEvents } from "@/context/EventContext";

export function CreateEventDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { myOwnEvents } = useEvents();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    organizer: "",
    category: "",
    location: "",
    date: null,
    capacity: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageCropped = (blob) => {
    const file = new File([blob], "event-image.jpg", {
      type: "image/jpeg",
    });

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "event_management");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dv2fvq9dd/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error?.message || "Cloudinary upload failed");
    }

    return result;
  };

  const handleSubmit = async () => {
    const { name, description, organizer, category, location, date, capacity } =
      formData;

    if (
      !name ||
      !description ||
      !organizer ||
      !category ||
      !location ||
      !date ||
      !capacity ||
      !imageFile
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image
      const cloudinaryData = await uploadToCloudinary(imageFile);

      // 2️⃣ Send event to backend
      await API.post("/api/events", {
        name,
        description,
        organizer,
        category,
        location,
        date,
        capacity: Number(capacity),
        image: {
          url: cloudinaryData.secure_url,
          public_id: cloudinaryData.public_id,
        },
      });

      toast.success("Event created successfully 🎉");

      setOpen(false);

      // Reset
      setFormData({
        name: "",
        description: "",
        organizer: "",
        category: "",
        location: "",
        date: null,
        capacity: "",
      });

      setImageFile(null);
      setImagePreview(null);
      myOwnEvents();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create Event</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to create your event.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          {/* Image */}
          <div>
            <p className="mb-2 font-medium">Event Image</p>

            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <ImageUploader
                aspectRatio={16 / 9}
                onImageCropped={handleImageCropped}
              />
            )}
          </div>

          <Input
            placeholder="Event Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Textarea
            placeholder="Event Description"
            className="min-h-[120px]"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Input
            placeholder="Organizer"
            value={formData.organizer}
            onChange={(e) => handleChange("organizer", e.target.value)}
          />

          <Select onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />

          {/* Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 z-[100]">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(value) => handleChange("date", value)}
              />
            </PopoverContent>
          </Popover>

          <Input
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={(e) => handleChange("capacity", e.target.value)}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
