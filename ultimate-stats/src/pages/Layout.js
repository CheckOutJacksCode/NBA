import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../NavBar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <br></br>
      <Outlet />
    </>
  );
};

export default Layout;