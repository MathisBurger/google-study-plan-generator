import React, {PropsWithChildren, useEffect, useState} from "react";
import {CalendarContext} from "../hooks/useCalendar";
import ApiCalendar from "react-google-calendar-api";


const CalendarWrapper: React.FC<PropsWithChildren<any>> = ({children}) => {

    const [apiCalendar, setApiCalendar] = useState<ApiCalendar|null>(null);

    useEffect(() => {
        const config = {
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
            scope: "https://www.googleapis.com/auth/calendar",
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
            ]
        };
        setApiCalendar(new ApiCalendar(config));
    }, []);

    return (
        <CalendarContext.Provider value={apiCalendar}>
            {children}
        </CalendarContext.Provider>
    );
}

export default CalendarWrapper;
