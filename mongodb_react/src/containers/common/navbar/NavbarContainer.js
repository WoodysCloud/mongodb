import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarComponent from "../../../components/common/navbar/NavbarComponent";

const baseURL = "http://localhost:3000";

function NavbarContainer({ isLoggedin, setIsLoggedin, profile }) {
  const history = useHistory();

  const [searchState, setSearchState] = useState(false);

  const [searchInfo, setSearchInfo] = useState({
    search: "",
  });
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchInfo.search.length > 0) {
      // 타이핑 하고 있다.
      setSearchState(true);
    } else {
      // 입력값이 없다면
      setSearchState(false);
    }
  }, [searchInfo]); // searchInfo가 바뀔때마다 실행. [] 없으면 초기 1회

  const onClickAutoComplete = (text) => {
    const originText = text[0].replace("<em>", "").replace("</em>", "");

    setSearchInfo({
      ...searchInfo,
      search: originText,
    });
  };

  const onChangeInput = async (event) => {
    // 검색어 입력
    const { name, value } = event.target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });

    // axios
    // 자동완성 api
    // url: /ssac/search/:q
    try {
      const result = await axios({
        method: "GET",
        // url: `${baseURL}/ssac/search/?q=${searchInfo.search}`,
        url: `${baseURL}/ssac/search`,
        params: {
          q: value, // query string
        },
        // data: searchInfo, // body값에 넣는 것이기 때문에 GET방식일때는 사용지양
      });
      // console.log(response);
      // console.log(response.data;
      console.log(result);
      if (result.status === 200) {
        const elsData = result.data.data;
        setSearchData(elsData);
        console.log(elsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSignout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedin(false);
    history.push("/");
  };

  const onClickHome = () => {
    history.push("/");
  };

  return (
    <NavbarComponent
      profile={profile}
      onClickAutoComplete={onClickAutoComplete}
      searchData={searchData}
      searchState={searchState}
      isLoggedin={isLoggedin}
      onClickSignout={onClickSignout}
      onChangeInput={onChangeInput}
      searchInfo={searchInfo}
      onClickHome={onClickHome}
    />
  );
}

export default NavbarContainer;
