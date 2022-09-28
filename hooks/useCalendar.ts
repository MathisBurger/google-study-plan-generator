import {createContext, useContext} from "react";
import ApiCalendar from "react-google-calendar-api";

export const CalendarContext = createContext<ApiCalendar|null>(null);

/**
 * Provides the data of the calendar context to the component
 * which uses the hook.
 */
const useCalendar = () => useContext(CalendarContext);

export default useCalendar;
