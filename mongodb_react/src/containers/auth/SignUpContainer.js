import React, { useState } from "react";
import SignUpComponent from "../../components/auth/SignUpComponent";
import axios from "axios";

const baseURL = "http://localhost:3000";

function SignUpContainer() {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    password: "",
  });

  // 입력할 때마다 이벤트
  const onChangeInput = (event) => {
    const { name, value } = event.target;
    // 값 확인
    // console.log(`${name}: name`); // 빈 공백
    // console.log(`${value}: value`);
    // 컴포넌트에서 name 정의해줘야함

    setUserInfo({
      ...userInfo, // spread 연산자를 이용하여 전에 있던 데이터도 가져올 것
      [name]: value, // dynamic object key value
    });
    // console.log(userInfo);
  };

  const onSubmit = async () => {
    try {
      const result = await axios({
        url: `${baseURL}/ssac/signup`,
        method: "POST",
        data: userInfo,
      });
      if (result.status === 200) {
        // success => data needed
        console.log("회원가입 성공");
        console.log(result.data);
      }
    } catch (error) {
      // fail => status needed
      console.log(error.response);
      const errorStatus = error.response.status;

      if (errorStatus === 409) {
        alert("중복된 아이디가 존재합니다");
      } else {
        alert("서버 에러가 발생했습니다.");
      }
    }
    // setUserInfo({
    //   userId: "",
    //   name: "",
    //   password: "",
    // });
  };

  return (
    <SignUpComponent
      onChangeInput={onChangeInput}
      userInfo={userInfo}
      onSubmit={onSubmit}
    />
  );
}

export default SignUpContainer;
