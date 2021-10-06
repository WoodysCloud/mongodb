import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import WriteComponent from "../../components/write/WriteComponent";

const baseURL = "http://localhost:3000";

function WriteContainer() {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onChangeBody = (text) => {
    console.log(text);
    setBody(text);
  };

  const onChangeInput = (text) => {
    const { name, value } = text.target;
    setTitle(value);
  };

  const onClickSubmit = async () => {
    const boardPw = "1234";
    const axiosBody = {
      title: title,
      content: body,
      boardPw: boardPw,
    };
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기
    // POST
    // url: /ssac/board
    // headers: { Authorization: token }
    // body { title, content, boardPw}

    try {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/ssac/board`,
        headers: { Authorization: token }, // header에 header값 보내기
        data: axiosBody,
      });

      if (response.status === 200) {
        console.log(response.data);
        history.push("/"); // 성공하면 다시 홈페이지로 useHistory 사용
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WriteComponent
      onChangeBody={onChangeBody}
      body={body}
      onChangeInput={onChangeInput}
      title={title}
      onClickSubmit={onClickSubmit}
    />
  );
}

export default WriteContainer;
