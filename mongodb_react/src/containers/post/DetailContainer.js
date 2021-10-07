import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import DetailComponent from "../../components/post/DetailComponent";

const baseURL = "http://localhost:3000";

function DetailContainer({ profile }) {
  const params = useParams();
  const { postId } = params;
  // console.log(postId);

  const history = useHistory();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getDetail() {
      setLoading(true);
      try {
        const response = await axios({
          method: "GET",
          url: `${baseURL}/ssac/board/${postId}`,
        });
        if (response.status === 200) {
          const result = response.data.data;
          // console.log(result);
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getDetail();
  }, []);

  // console.log(data);

  const onClickDelete = async () => {
    // 토큰이 있어야 삭제 가능
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios({
        method: "DELETE",
        url: `${baseURL}/ssac/board/${postId}`,
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        console.log("삭제 성공");
        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const onClickEdit = async () => {
  //   const token = localStorage.getItem("accessToken");
  //   try {
  //     const response = await axios({
  //       method: "PUT",
  //       url: `${baseURL}/ssac/board/${postId}`,
  //       headers: { Authorization: token },
  //     });
  //     if (response.stauts === 200) {
  //       console.log("업데이트 완료");
  //       history.goBack();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const onClickGoBack = () => {
    history.goBack(); // goBack method 사용
  };

  return (
    <DetailComponent
      profile={profile}
      data={data}
      loading={loading}
      onClickGoBack={onClickGoBack}
      onClickDelete={onClickDelete}
    />
  );
}

export default DetailContainer;
