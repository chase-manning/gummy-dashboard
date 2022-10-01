import { useSelector } from "react-redux";
import styled from "styled-components";
import Create from "./components/Create";
import Iframe from "./components/IFrame";
import { selectIframes } from "./state/coreSlice";

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
  const iframes = useSelector(selectIframes);

  const hasIframes = iframes.length > 0;

  return (
    <StyledApp>
      <Create show={!hasIframes} close={() => console.log("")} />
      {hasIframes &&
        iframes.map((iframe) => <Iframe key={iframe.id} iframe={iframe} />)}
    </StyledApp>
  );
};

export default App;
