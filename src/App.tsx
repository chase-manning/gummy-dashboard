import styled from "styled-components";
import Iframe from "./components/IFrame";

const StyledApp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 1fr);
`;

const App = () => {
  return (
    <StyledApp>
      <Iframe iframe={{ url: "https://mero.finance/pools" }} />
      <Iframe iframe={{ url: "https://mero.finance/pools" }} />
      <Iframe iframe={{ url: "https://mero.finance/pools" }} />
    </StyledApp>
  );
};

export default App;
