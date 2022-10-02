import useStore, { Container } from "./store";

const setIframeScroll = (
  container: Container,
  iframeId: string,
  scroll: number
): Container => {
  for (let child of container.children) {
    if (child.type === "iframe") {
      if (child.id !== iframeId) continue;
      child.scroll = scroll;
      return container;
    } else {
      child = setIframeScroll(child, iframeId, scroll);
    }
  }
  return container;
};

const useSetIframeScroll = () => {
  const { store, setStore } = useStore();

  return (iframeId: string, scroll: number) => {
    const iframes = setIframeScroll(store.iframes, iframeId, scroll);
    setStore({ ...store, iframes });
  };
};

export default useSetIframeScroll;
