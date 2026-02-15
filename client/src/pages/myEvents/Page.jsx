import { CreateEventDialog } from "@/components/createDialog";
import { useEvents } from "@/context/useEvents";
import { useRegistration } from "@/context/useRegistration";
import React from "react";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { LoaderOne } from "@/components/ui/loader";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
import { EventCard } from "@/components/EventCard";
import { NavbarDemo } from "@/components/Navbar";

const MyEvents = () => {
  const { loadMyEvents, myEvents, loading, selectEvent } = useRegistration();
  const { myOwnEvents, myCreatedEvents, error } = useEvents();
  useEffect(() => {
    myOwnEvents();
    loadMyEvents();
  }, []);
  const selectFunction = (event) => {
    selectEvent(event);
  };
  return (
    <div>
      <NavbarDemo />
      <div>
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <LoaderOne />
          </div>
        ) : (
          <div>
            {error ? (
              <div>error</div>
            ) : (
              <div>
                <div className="p-1 md:p-5 w-full max-w-300 mx-auto">
                  <div className="flex justify-between mb-4">
                    <h1 className="font-bold">Your Own Events</h1>
                    {myCreatedEvents.length > 0 && <CreateEventDialog />}
                  </div>
                  <div>
                    {myCreatedEvents.length === 0 ? (
                      <div>
                        <Empty>
                          <EmptyHeader>
                            <EmptyMedia variant="icon" className="bg-red-500">
                              <IconFolderCode />
                            </EmptyMedia>
                            <EmptyTitle>No Event Created Yet</EmptyTitle>
                            <EmptyDescription>
                              You haven&apos;t created any Event yet. Get
                              started by creating your first Event.
                            </EmptyDescription>
                          </EmptyHeader>
                          <EmptyContent className="flex-row justify-center gap-2">
                            <CreateEventDialog />
                          </EmptyContent>
                        </Empty>
                      </div>
                    ) : (
                      <ul className="flex flex-wrap gap-2 md:gap-5 justify-center md:justify-start mb-4">
                        {myCreatedEvents.map((eachEvent) => (
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
                  <h1 className="font-bold mb-4">Registered Events</h1>
                  <div>
                    {myEvents.length === 0 ? (
                      <div className="flex flex-col items-center justify-center mt-20">
                        <img
                          src="https://res.cloudinary.com/dv2fvq9dd/image/upload/v1771178863/noEvent-removebg-preview_rmjyny.png"
                          alt="No Registrations"
                          className="w-80 h-80 mb-4"
                        />
                      </div>
                    ) : (
                      <ul className="flex flex-wrap gap-2 md:gap-5 justify-center md:justify-start">
                        {myEvents.map((eachEvent) => (
                          <li key={eachEvent._id} className="list-none">
                            <EventCard
                              eventDetails={eachEvent.eventId}
                              eventId={eachEvent.eventId}
                              eventFunction={selectFunction}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyEvents;
