import { Fragment } from "react";
import "../styles/globals.css";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
