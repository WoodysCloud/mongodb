import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const ItemBox = styled.div`
  border: 1px solid grey;
  padding: 1rem;
  box-sizing: border-box;
  width: 50rem;
  cursor: pointer;

  & + & {
    margin-top: 1rem;
  }
`;

const ItemTitle = styled.div`
  font-size: 2rem;
  font-weight: bolder;
`;

const ItemInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemWriter = styled.div`
  font-size: 1.4rem;
  font-weight: normal;
  color: grey;
`;

const ItemCreatedDate = styled.div`
  font-size: 1.4rem;
  font-weight: normal;
  color: grey;
`;

const ItemContent = styled.div`
  font-size: 1.6rem;
  font-weight: normal;
  padding: 1rem 0;
`;

function PostItemComponent({ post, onClickPost }) {
  // console.log(post);

  // 비구조화 할당으로 PostsListContainer에서 map함수에 쓰인 것들 받아오기
  const { title, content, writer, writeTime, _id } = post;
  // console.log(writer)
  // console.log(_id)

  // dayjs 패키지 다운받아서 활용
  const formatDate = dayjs(writeTime).format("YYYY-MM-DD");

  return (
    // onClick 매개변수 쓸때는 익명함수 사용
    <ItemBox onClick={() => onClickPost(_id)}>
      <ItemTitle>{title}</ItemTitle>
      <ItemInfoWrap>
        <ItemWriter>{writer && writer.name}</ItemWriter>
        <ItemCreatedDate>{formatDate}</ItemCreatedDate>
      </ItemInfoWrap>
      <hr />
      {/* 태그 지우는 용도 */}
      <ItemContent dangerouslySetInnerHTML={{ __html: content }} />
    </ItemBox>
  );
}

export default PostItemComponent;
