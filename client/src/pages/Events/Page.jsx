import React from "react";
import { useEvents } from "@/context/useEvents";
import { useRegistration } from "@/context/useRegistration";
import { EventCard } from "@/components/EventCard";
import { NavbarDemo } from "@/components/Navbar";
import { LoaderOne } from "@/components/ui/loader";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const EventsList = () => {
  const { events, loading, fetchEvents, fetchEventsByFilters, error } =
    useEvents();
  const { selectEvent } = useRegistration();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = () => {
    fetchEventsByFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      location: "",
    });
    fetchEvents();
  };

  const selectFunction = (event) => {
    selectEvent(event);
  };

  return (
    <div>
      <NavbarDemo />

      <div className="max-w-300 mx-auto px-6 mt-8 space-y-8">
        {/* 🔍 FILTER SECTION */}
        <div className="bg-muted/40 p-6 rounded-xl border space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search by Name */}
            <Input
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            {/* Category Filter */}
            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters({ ...filters, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Input
              placeholder="Location..."
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="w-full">
                Search
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* EVENTS GRID */}
        <div>
          {loading ? (
            <div className="w-full h-[50vh] flex items-center justify-center">
              <LoaderOne />
            </div>
          ) : (
            <div>
              {error ? (
                <div className="flex items-center justify-center">
                  <p>something went wrong</p>
                </div>
              ) : (
                <div>
                  {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20">
                      <img
                        src="https://res.cloudinary.com/dv2fvq9dd/image/upload/v1771179358/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector-Photoroom_h18bzp.png"
                        alt="No Events"
                        className="w-80 h-80 mb-4"
                      />
                      <p>No Events found</p>
                    </div>
                  ) : (
                    <ul className="flex flex-wrap gap-6 items-start justify-center space-x-auto">
                      {events.map((eachEvent) => (
                        <li key={eachEvent._id} className="list-none">
                          <EventCard
                            eventDetails={eachEvent}
                            eventId={eachEvent}
                            eventFunction={selectFunction}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsList;
