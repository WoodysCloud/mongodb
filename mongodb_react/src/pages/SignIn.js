import React from "react";
import FullCenterContatiner from "../components/common/contatiner/FullCenterContatiner";
import SignInContainer from "../containers/auth/SignInContainer";

function SignIn() {
  return (
    <>
      <FullCenterContatiner>
        <SignInContainer />
      </FullCenterContatiner>
    </>
  );
}

export default SignIn;
