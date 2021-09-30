import React from "react";
import FullCenterContatiner from "../components/common/contatiner/FullCenterContatiner";
import SignUpContainer from "../containers/auth/SignUpContainer";

function SignUp() {
  return (
    <>
      <FullCenterContatiner>
        <SignUpContainer />
      </FullCenterContatiner>
    </>
  );
}

export default SignUp;
