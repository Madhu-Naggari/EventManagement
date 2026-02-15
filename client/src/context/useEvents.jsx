import { EventContext } from "./EventContext";
import { useContext } from "react";
export const useEvents = () => useContext(EventContext);
