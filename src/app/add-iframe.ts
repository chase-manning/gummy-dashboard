import { generateId } from "../helpers/id-helper";
import useStore, { Container, IframeType } from "./store";

const addIframeToChild = (
  container: Container,
  iframeId: string,
  iframe: IframeType,
  position: "left" | "right" | "top" | "bottom"
): Container => {
  const isNewLR = position === "left" || position === "right";
  const isNewLT = position === "left" || position === "top";
  const isCurentLR = container.direction === "row";

  // Adding if first child
  if (container.children.length === 0) {
    container.children.push(iframe);
    return container;
  }

  const source = container.children.findIndex((child) => child.id === iframeId);
  // If adding an iframe to existing container
  if (isNewLR === isCurentLR) {
    if (isNewLT) {
      container.children.splice(source, 0, iframe);
    } else {
      container.children.splice(source + 1, 0, iframe);
    }
    return container;
  }

  // If adding an iframe to a new container
  const oldChild = container.children[source];
  container.children[source] = {
    id: generateId(),
    type: "container",
    direction: isNewLR ? "row" : "column",
    children: isNewLT ? [iframe, oldChild] : [oldChild, iframe],
  };
  return container;
};

const addIframe = (
  container: Container,
  containerId: string,
  iframeId: string,
  iframe: IframeType,
  position: "left" | "right" | "top" | "bottom"
): Container => {
  if (container.id === containerId) {
    return addIframeToChild(container, iframeId, iframe, position);
  }
  for (let child of container.children) {
    if (child.type === "iframe") continue;
    child = addIframe(child, containerId, iframeId, iframe, position);
  }
  return container;
};

const useAddIframe = () => {
  const { store, setStore } = useStore();

  return (
    containerId: string,
    iframeId: string,
    iframe: IframeType,
    position: "left" | "right" | "top" | "bottom"
  ) => {
    const iframes = addIframe(
      store.iframes,
      containerId,
      iframeId,
      iframe,
      position
    );
    setStore({ ...store, iframes });
  };
};

export default useAddIframe;
