import GlobalStyles from "./GlobalStyles";
import NavbarContainer from "./containers/common/navbar/NavbarContainer";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  // 페이지 렌더링 후 최초 1회
  // 자동 로그인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <NavbarContainer isLoggedin={isLoggedin} /> {/* 로그인 유무 */}
      <Route path="/" exact={true} component={Home} />
      <Route path="/signin" exact={true} component={SignIn} />
      <Route path="/signup" exact={true} component={SignUp} />
    </>
  );
}

export default App;
