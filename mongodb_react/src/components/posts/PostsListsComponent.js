import React from "react";
import styled from "styled-components";
import LoadingComponent from "../common/loading/LoadingComponent";
import PostItemComponent from "../post/PostItemComponent";

const PostListWrap = styled.div`
  padding-top: 8rem; /* nav 높이만큼 뺌 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// props 넘겨줄때 {} 필수 => 배열로 넘겨줌
function PostsListsComponent({ postsList, onClickPost, loading }) {
  // console.log(postsList);
  return (
    <>
      {/* 3항 연산자 사용 */}
      {/* 로딩중(setLoading(true)일 때 <LoadingComponent> 보여주고, 로딩끝나면(setLoading(false)) empty component */}
      {/* {loading ? <LoadingComponent /> : <></>} */}

      {/* loading이 true일 때 로딩컴포넌트 실행, 위의 3항연산자와 같은 기능 */}
      {loading && <LoadingComponent />}

      {/* postsList 순회하여 props형태로 넘겨줌 => map함수 */}
      {/* map함수 사용 */}
      <PostListWrap>
        {/* JSX, 태그 안에 넣을 땐 {} */}
        {postsList.map((item, idx) => (
          // ()는 바로 리턴, {}는 return 입력 필수
          <PostItemComponent key={idx} post={item} onClickPost={onClickPost} />
        ))}
      </PostListWrap>
    </>
  );
}

export default PostsListsComponent;
