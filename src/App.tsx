import { useSelector } from "react-redux";
import styled from "styled-components";
import Create from "./components/Create";
import IframeContainer from "./components/IframeContainer";
import { selectIframes } from "./state/coreSlice";

const StyledApp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const App = () => {
  const iframes = useSelector(selectIframes);

  const hasIframes = iframes.children.length > 0;

  return (
    <StyledApp>
      <Create
        iframeId=""
        show={!hasIframes}
        close={() => console.log("")}
        containerId="root"
        position="right"
      />
      {hasIframes && <IframeContainer container={iframes} />}
    </StyledApp>
  );
};

export default App;
