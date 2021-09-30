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

const InputWrap = styled.div`
  & + & {
    margin-top: 3rem;
  }
`;

const StyledRoundedButton = styled(RoundedButton)`
  background: orange;
`;

function SignUpComponent({ onChangeInput, userInfo, onSubmit }) {
  // 비구조화 할당으로 받아줌
  const { userId, name, password } = userInfo;

  return (
    <BorderBox>
      <InputTitle>회원가입</InputTitle>
      <FormWrap>
        <InputWrap>
          <InputLabel>유저 아이디</InputLabel>
          {/* name과 value는 항상 같이 입력 */}
          <RoundedInput name="userId" value={userId} onChange={onChangeInput} />
        </InputWrap>
        <InputWrap>
          <InputLabel>이름</InputLabel>
          <RoundedInput name="name" value={name} onChange={onChangeInput} />
        </InputWrap>
        <InputWrap>
          <InputLabel>비밀 번호</InputLabel>
          <RoundedInput
            name="password"
            value={password}
            onChange={onChangeInput}
          />
        </InputWrap>
        <StyledRoundedButton onClick={onSubmit}>회원가입</StyledRoundedButton>
      </FormWrap>
    </BorderBox>
  );
}

export default SignUpComponent;
