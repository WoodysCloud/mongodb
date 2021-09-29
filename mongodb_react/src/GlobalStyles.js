import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// css 초기화
const GlobalStyles = createGlobalStyle`
  ${reset};
  html {
    font-size: 10px;
  }
`;

export default GlobalStyles;
