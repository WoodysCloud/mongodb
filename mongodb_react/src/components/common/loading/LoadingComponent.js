import React, { useEffect } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

const LoadingWrap = styled.div`
  /* vh, vw 사용 주의 */
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
`;

function LoadingComponent() {
  // 렌더링될 때 변경사항
  useEffect(() => {
    // 로딩중일때 아무것도 못하게, even scroll
    document.body.style.overflow = "hidden";

    // useEffect에서 return: 마무리함수, 해당 컴포넌트가 사라졌을때 실행
    return () => {
      // console.log("로딩 렌더링 사라짐");
      document.body.style.overflow = "visible";
    };
  }, []); // 빈배열이면 첫 렌더링될때 1회 실행

  return (
    <LoadingWrap>
      <ReactLoading type={"spin"} />
    </LoadingWrap>
  );
}

export default LoadingComponent;
