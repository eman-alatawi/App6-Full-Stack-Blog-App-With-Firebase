import React from "react";
import Routers from "../../routers/Routers";
import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
