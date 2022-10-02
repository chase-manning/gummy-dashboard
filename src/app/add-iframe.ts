import { generateId } from "../helpers/id-helper";
import useStore, { Child, Container, IframeType } from "./store";

const addIframeToChild = (
  container: Container,
  iframeId: string,
  iframe: IframeType,
  position: "left" | "right" | "top" | "bottom"
): Container => {
  const isNewLR = position === "left" || position === "right";
  const isCurentLR = container.direction === "row";

  // Adding if first child
  if (container.children.length === 0) {
    container.children.push(iframe);
    return container;
  }

  const source = container.children.findIndex(
    (child: Child) => child.id === iframeId
  );
  // If adding an iframe to existing container
  if (isNewLR === isCurentLR) {
    if (position === "left" || position === "top") {
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
    children: [
      position === "left" || position === "top" ? iframe : oldChild,
      position === "left" || position === "top" ? oldChild : iframe,
    ],
  };
  return container;
};

const addIframe = (
  iframes: Container,
  containerId: string,
  iframeId: string,
  iframe: IframeType,
  position: "left" | "right" | "top" | "bottom"
): Container => {
  if (iframes.id === containerId) {
    iframes = addIframeToChild(iframes, iframeId, iframe, position);
    return iframes;
  } else {
    for (let i = 0; i < iframes.children.length; i++) {
      let child = iframes.children[i];
      if (child.id === containerId) {
        child = addIframeToChild(
          child as Container,
          iframeId,
          iframe,
          position
        );
        return iframes;
      }
      if (child.type === "iframe") continue;
      for (let j = 0; j < (child as Container).children.length; j++) {
        let grandChild = (child as Container).children[j];
        if (grandChild.id === containerId) {
          grandChild = addIframeToChild(
            grandChild as Container,
            iframeId,
            iframe,
            position
          );
          return iframes;
        }
        if (grandChild.type === "iframe") continue;
        for (let k = 0; k < (grandChild as Container).children.length; k++) {
          let greatGrandChild = (grandChild as Container).children[k];
          if (greatGrandChild.id === containerId) {
            greatGrandChild = addIframeToChild(
              greatGrandChild as Container,
              iframeId,
              iframe,
              position
            );
            return iframes;
          }
        }
      }
    }
  }

  throw new Error("Container not found");
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
