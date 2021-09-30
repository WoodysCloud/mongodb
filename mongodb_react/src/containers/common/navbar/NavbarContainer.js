import React from "react";
import NavbarComponent from "../../../components/common/navbar/NavbarComponent";

function NavbarContainer({ isLoggedin }) {
  return <NavbarComponent isLoggedin={isLoggedin} />;
}

export default NavbarContainer;
