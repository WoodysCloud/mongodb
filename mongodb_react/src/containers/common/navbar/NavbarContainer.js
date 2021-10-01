import React from "react";
import { useHistory } from "react-router-dom";
import NavbarComponent from "../../../components/common/navbar/NavbarComponent";

function NavbarContainer({ isLoggedin, setIsLoggedin }) {
  const history = useHistory();

  const onClickSignout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedin(false);
    history.push("/");
  };

  return (
    <NavbarComponent isLoggedin={isLoggedin} onClickSignout={onClickSignout} />
  );
}

export default NavbarContainer;
