import React, { useEffect, useState } from "react";
import PostsListsComponent from "../../components/posts/PostsListsComponent";
import axios from "axios";
import { useHistory } from "react-router";

const baseURL = "http://localhost:3000";

function PostsListContainer() {
  const history = useHistory();

  // 서버에서 전체 게시물 받아와서 state에 초기화, 그 데이터 값을 바탕으로 postListComponent에 map 함수와 postsItemComponent를 써서 게시물 전체 조회 기능
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    // useEffect에서 async, await 쓰려면 익명함수 사용 => getData()
    async function getData() {
      // axios 통신
      try {
        const response = await axios({
          method: "GET",
          url: `${baseURL}/ssac/board`,
        });
        // console.log(response);
        if (response.status === 200) {
          const result = response.data.data;
          // console.log(result);
          setPostsList(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const onClickPost = (postId) => {
    console.log(postId);
    history.push(`/post/${postId}`);
  };

  // console.log(postsList);
  // console.log(postsList[0]);
  // console.log(postsList[0].title);
  // console.log(postsList[0].content);

  return (
    <PostsListsComponent onClickPost={onClickPost} postsList={postsList} />
  );
}

export default PostsListContainer;
