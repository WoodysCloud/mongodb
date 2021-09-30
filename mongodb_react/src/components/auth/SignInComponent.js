import React from "react";
import styled from "styled-components";
import BorderBox from "../common/box/BorderBox";
import RoundedButton from "../common/button/RoundedButton";
import RoundedInput from "../common/input/RoundedInput";
import InputLabel from "../common/text/InputLabel";
import InputTitle from "../common/text/InputTitle";

const FormWrap = styled.div`
  margin-top: 2rem;
`;

// 인접한 것 중 뒤에꺼가 적용받음
const InputWrap = styled.div`
  & + & {
    margin-top: 3rem;
  }
`;

function SignInComponent({ onChangeInput, onSubmit, userInfo }) {
  // 입력값 받아오기
  const { userId, password } = userInfo;

  return (
    <BorderBox>
      <InputTitle>로그인</InputTitle>
      <FormWrap>
        <InputWrap>
          <InputLabel>유저 아이디</InputLabel>
          <RoundedInput name="userId" value={userId} onChange={onChangeInput} />
        </InputWrap>
        <InputWrap>
          <InputLabel>비밀 번호</InputLabel>
          <RoundedInput
            type="password"
            name="password"
            value={password}
            onChange={onChangeInput}
          />
        </InputWrap>
        <RoundedButton onClick={onSubmit}>로그인</RoundedButton>
      </FormWrap>
    </BorderBox>
  );
}

export default SignInComponent;
