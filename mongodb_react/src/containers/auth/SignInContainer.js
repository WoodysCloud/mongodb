import axios from "axios";
import React, { useState } from "react";
import SignInComponent from "../../components/auth/SignInComponent";
import { useHistory } from "react-router-dom";

const baseURL = "http://localhost:3000";

function SignInContainer() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      const result = await axios({
        url: `${baseURL}/ssac/signin`,
        method: "POST",
        data: userInfo,
      });
      if (result.status === 200) {
        console.log("로그인 성공");
        // console.log(result.data);
        const accessToken = result.data.accessToken;
        localStorage.setItem("accessToken", accessToken); // 토큰을 local에 저장
        history.push("/");
      }
    } catch (error) {
      console.log(error.response);
      const errorStatus = error.response.status;

      if (errorStatus === 400) {
        alert("아이디 또는 비밀번호 입력 오류");
      } else {
        alert("서버 에러가 발생했습니다.");
      }
    }
  };

  return (
    <SignInComponent
      onChangeInput={onChangeInput}
      onSubmit={onSubmit}
      userInfo={userInfo}
    />
  );
}

export default SignInContainer;
