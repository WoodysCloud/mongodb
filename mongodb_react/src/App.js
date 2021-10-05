import GlobalStyles from "./GlobalStyles";
import NavbarContainer from "./containers/common/navbar/NavbarContainer";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Write from "./pages/Write";
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
      <NavbarContainer isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
      <Route path="/" exact={true} component={Home} />
      <Route
        path="/signin"
        exact={true}
        component={() => <SignIn setIsLoggedin={setIsLoggedin} />}
      />
      <Route path="/signup" exact={true} component={SignUp} />
      <Route path="/write" exact={true} component={Write} />
    </>
  );
}

export default App;
