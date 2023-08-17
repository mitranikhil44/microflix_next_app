// pages/_app.js
import "../styles/globals.css";

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export const metadata = {
  title: "Coder Bugs",
  description: "A blog for a coder by a coder",
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="w-9/12 m-auto">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
