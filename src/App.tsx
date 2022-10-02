import styled from "styled-components";
import useStore from "./app/store";
import Create from "./components/Create";
import IframeContainer from "./components/IframeContainer";

const StyledApp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const App = () => {
  const { store } = useStore();

  const hasIframes = store.iframes.children.length > 0;

  return (
    <StyledApp>
      <Create
        iframeId=""
        show={!hasIframes}
        close={() => console.log("")}
        containerId="root"
        position="right"
      />
      {hasIframes && <IframeContainer container={store.iframes} />}
    </StyledApp>
  );
};

export default App;
