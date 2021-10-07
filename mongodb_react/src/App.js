import GlobalStyles from "./GlobalStyles";
import NavbarContainer from "./containers/common/navbar/NavbarContainer";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Write from "./pages/Write";
import { useEffect, useState } from "react";
import Detail from "./pages/Detail";
import axios from "axios";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [profile, setProfile] = useState(null);

  // 페이지 렌더링 후 최초 1회
  // 자동 로그인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken);
    if (accessToken) {
      axios({
        method: "GET",
        url: "http://localhost:3000/ssac/profile",
        headers: { Authorization: accessToken },
      })
        .then((response) => {
          const result = response.data.data;
          console.log(result);
          setProfile(result);
          setIsLoggedin(true);
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedin(false);
        });
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <NavbarContainer
        profile={profile}
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
      />
      <Route path="/" exact={true} component={Home} />
      <Route
        path="/signin"
        exact={true}
        component={() => <SignIn setIsLoggedin={setIsLoggedin} />}
      />
      <Route path="/signup" exact={true} component={SignUp} />
      <Route path="/write" exact={true} component={Write} />
      <Route
        path="/post/:postId"
        exact={true}
        component={() => <Detail profile={profile} />}
      />
    </>
  );
}

export default App;
