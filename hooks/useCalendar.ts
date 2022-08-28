import {createContext, useContext} from "react";
import ApiCalendar from "react-google-calendar-api";

export const CalendarContext = createContext<ApiCalendar|null>(null);

const useCalendar = () => useContext(CalendarContext);

export default useCalendar;
