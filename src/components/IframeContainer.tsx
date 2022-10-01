import styled from "styled-components";
import { Container } from "../state/coreSlice";
import Iframe from "./IFrame";

interface ContainerProps {
  direction: "row" | "column";
}

const StyledIframeContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: ${(props: ContainerProps) => props.direction};
`;

interface Props {
  container: Container;
}

const IframeContainer = ({ container }: Props) => {
  return (
    <StyledIframeContainer id={container.id} direction={container.direction}>
      {container.children.map((child) => {
        if (child.type === "iframe") {
          return <Iframe container={container} iframe={child} />;
        }
        if (child.type === "container") {
          return <IframeContainer container={child} />;
        }
      })}
    </StyledIframeContainer>
  );
};

export default IframeContainer;