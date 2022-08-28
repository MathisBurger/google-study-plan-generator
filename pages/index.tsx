import type { NextPage } from 'next';
import ApiCalendar from "react-google-calendar-api";
import ConfigApiCalendar from "react-google-calendar-api";
import {useEffect, useState} from "react";



/**
 * Home page
 *
 * @constructor
 */
const Home: NextPage = () => {

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

  const loginWithGoogle = () => {
    if (apiCalendar) {
      apiCalendar.handleAuthClick();
    }
  };

  return (
    <button onClick={loginWithGoogle}>Login with google</button>
  )
}

export default Home;
