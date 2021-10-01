import React from "react";
import FullCenterContatiner from "../components/common/contatiner/FullCenterContatiner";
import SignInContainer from "../containers/auth/SignInContainer";

function SignIn({ setIsLoggedin }) {
  return (
    <>
      <FullCenterContatiner>
        <SignInContainer setIsLoggedin={setIsLoggedin} />
      </FullCenterContatiner>
    </>
  );
}

export default SignIn;
