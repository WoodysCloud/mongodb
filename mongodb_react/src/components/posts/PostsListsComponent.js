import React from "react";
import styled from "styled-components";
import PostItemComponent from "../post/PostItemComponent";

const PostListWrap = styled.div`
  padding-top: 8rem; /* nav 높이만큼 뺌 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// props 넘겨줄때 {} 필수 => 배열로 넘겨줌
function PostsListsComponent({ postsList, onClickPost }) {
  // console.log(postsList);
  return (
    <>
      {/* postsList 순회하여 props형태로 넘겨줌 => map함수 */}
      {/* map함수 사용 */}
      <PostListWrap>
        {/* JSX, 태그 안에 넣을 땐 {} */}
        {/* ()는 바로 리턴, {}는 return 입력 필수  */}
        {postsList.map((item, idx) => (
          <PostItemComponent key={idx} post={item} onClickPost={onClickPost} />
        ))}
      </PostListWrap>
    </>
  );
}

export default PostsListsComponent;
