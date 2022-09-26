import '../styles/globals.css';
import '../styles/Navbar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Navbar from "../components/Navbar";
import CalendarWrapper from "../components/CalendarWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Navbar />
        <CalendarWrapper>
            <Component {...pageProps} />
        </CalendarWrapper>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossOrigin="anonymous"></script>
      </>
  );

}

export default MyApp
