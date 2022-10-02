import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useRemoveIframe from "../app/remove-iframe";
import useSetIframeScroll from "../app/set-iframe-scroll";
import { Container, IframeType } from "../app/store";
import useTick from "../app/tick";
import Button from "./Button";
import Create from "./Create";

const StyledContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const IframeContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

interface IframeProps {
  disableScroll: boolean;
}

const StyledIframe = styled.iframe`
  width: 100%;
  min-height: ${(props: IframeProps) =>
    props.disableScroll ? "100%" : "1000%"};
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

const DeleteEvent = styled.div`
  position: absolute;
  width: 10rem;
  height: 10rem;
  top: 0;
  right: 0;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  transition: all 0.3s;

  transform: ${(p: PositionProps) => {
    if (p.open) return "translate(0, 0)";
    return "translate(8rem, -8rem)";
  }};
`;

interface Props {
  container: Container;
  iframe: IframeType;
}

type Position = "top" | "bottom" | "left" | "right";

const Iframe = ({ container, iframe }: Props) => {
  const [open, setOpen] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [createPosition, setCreatePosition] = useState<Position | "">("");
  const setIframeScroll = useSetIframeScroll();

  const removeIframe = useRemoveIframe();
  const tick = useTick();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  const isYoutube = iframe.url.includes("youtube");

  useEffect(() => {
    if (!iframeContainerRef.current) return;
    iframeContainerRef.current.scrollTop = iframe.scroll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeContainerRef.current]);

  useEffect(() => {
    if (tick === 0) return;
    if (!iframeRef.current) return;
    if (isYoutube) return;
    iframeRef.current.src += "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <>
      <StyledContainer>
        <IframeContainer
          ref={iframeContainerRef}
          onScroll={(e) => {
            setIframeScroll(iframe.id, e.currentTarget.scrollTop);
          }}
        >
          <StyledIframe
            disableScroll={isYoutube}
            ref={iframeRef}
            src={iframe.url}
            scrolling="no"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </IframeContainer>
        ;
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
        <DeleteEvent
          onMouseEnter={() => setDeleting(true)}
          onMouseLeave={() => setDeleting(false)}
        >
          <DeleteButton open={deleting}>
            <Button
              destructive
              circle
              click={() => removeIframe(container.id, iframe.id)}
            >
              x
            </Button>
          </DeleteButton>
        </DeleteEvent>
      </StyledContainer>
      <Create
        containerId={container.id}
        iframeId={iframe.id}
        position={createPosition || "left"}
        show={!!createPosition}
        close={() => setCreatePosition("")}
      />
    </>
  );
};

export default Iframe;
