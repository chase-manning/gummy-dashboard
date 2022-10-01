import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Create from "./Create";

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

interface PositionProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  open?: boolean;
}

const AddEvent = styled.div`
  position: absolute;
  width: ${(p: PositionProps) => (p.left || p.right ? "10rem" : "100%")};
  height: ${(p: PositionProps) => (p.top || p.bottom ? "10rem" : "100%")};
  top: ${(p: PositionProps) => (p.top || p.left || p.right ? "0" : "auto")};
  bottom: ${(p: PositionProps) => (p.bottom ? "0" : "auto")};
  left: ${(p: PositionProps) => (p.left ? "0" : "auto")};
  right: ${(p: PositionProps) => (p.right ? "0" : "auto")};
`;

const AddButton = styled.div`
  position: absolute;
  width: 4rem;
  height: 4rem;
  transition: all 0.3s;

  top: ${(p: PositionProps) => {
    if (p.top) return "2.5rem";
    if (p.bottom) return "auto";
    return "50%";
  }};
  bottom: ${(p: PositionProps) => {
    if (p.bottom) return "2.5rem";
    if (p.top) return "auto";
    return "50%";
  }};
  left: ${(p: PositionProps) => {
    if (p.left) return "2.5rem";
    if (p.right) return "auto";
    return "50%";
  }};
  right: ${(p: PositionProps) => {
    if (p.right) return "2.5rem";
    if (p.left) return "auto";
    return "50%";
  }};
  transform: ${(p: PositionProps) => {
    if (p.top) {
      if (p.open) return "translate(-50%, 0)";
      return "translate(-50%, -8rem)";
    }
    if (p.bottom) {
      if (p.open) return "translate(-50%, 0)";
      return "translate(-50%, 8rem)";
    }
    if (p.left) {
      if (p.open) return "translate(0, -50%)";
      return "translate(-8rem, -50%)";
    }
    if (p.right) {
      if (p.open) return "translate(0, -50%)";
      return "translate(8rem, -50%)";
    }
  }};
`;

export interface IframeType {
  id: string;
  url: string;
}

interface Props {
  iframe: IframeType;
}

type Position = "top" | "bottom" | "left" | "right";

const Iframe = ({ iframe }: Props) => {
  const [open, setOpen] = useState("");
  const [createPosition, setCreatePosition] = useState<Position | "">("");

  return (
    <>
      <Container>
        <StyledIframe src={iframe.url} scrolling="no" />;
        <AddEvent
          top
          onMouseEnter={() => setOpen("top")}
          onMouseLeave={() => setOpen("")}
        >
          <AddButton top open={open === "top"}>
            <Button primary circle click={() => setCreatePosition("top")}>
              +
            </Button>
          </AddButton>
        </AddEvent>
        <AddEvent
          bottom
          onMouseEnter={() => setOpen("bottom")}
          onMouseLeave={() => setOpen("")}
        >
          <AddButton bottom open={open === "bottom"}>
            <Button primary circle click={() => setCreatePosition("bottom")}>
              +
            </Button>
          </AddButton>
        </AddEvent>
        <AddEvent
          left
          onMouseEnter={() => setOpen("left")}
          onMouseLeave={() => setOpen("")}
        >
          <AddButton left open={open === "left"}>
            <Button primary circle click={() => setCreatePosition("left")}>
              +
            </Button>
          </AddButton>
        </AddEvent>
        <AddEvent
          right
          onMouseEnter={() => setOpen("right")}
          onMouseLeave={() => setOpen("")}
        >
          <AddButton right open={open === "right"}>
            <Button primary circle click={() => setCreatePosition("right")}>
              +
            </Button>
          </AddButton>
        </AddEvent>
      </Container>
      <Create show={!!createPosition} close={() => setCreatePosition("")} />
    </>
  );
};

export default Iframe;
