import type { NextPage } from 'next';
import ApiCalendar from "react-google-calendar-api";
import {useEffect, useState} from "react";
import useCalendar from "../hooks/useCalendar";
import CalendarWrapper from "../components/CalendarWrapper";



/**
 * Home page
 *
 * @constructor
 */
const Home: NextPage = () => {

  const apiCalendar = useCalendar();

  const loginWithGoogle = () => {
    if (apiCalendar) {
      apiCalendar.handleAuthClick();
    }
  };

  return (
    <CalendarWrapper>
      <button onClick={loginWithGoogle}>Login with google</button>
    </CalendarWrapper>
  )
}

export default Home;
