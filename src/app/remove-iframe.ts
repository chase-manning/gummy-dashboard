import useStore, { Container } from "./store";

const removeChildFromContainer = (
  container: Container,
  childId: string
): Container => {
  const target = container.children.findIndex((child) => child.id === childId);
  if (target === -1) throw new Error("target not found");
  container.children.splice(target, 1);
  return container;
};

const removeIframe = (
  container: Container,
  containerId: string,
  iframeId: string,
  parent?: Container
): Container => {
  if (container.id === containerId) {
    if (parent && container.children.length === 1) {
      return removeChildFromContainer(parent, container.id);
    }
    return removeChildFromContainer(container, iframeId);
  }
  for (let child of container.children) {
    if (child.type === "iframe") continue;
    child = removeIframe(child, containerId, iframeId, container);
  }
  return container;
};

const useRemoveIframe = () => {
  const { store, setStore } = useStore();

  return (containerId: string, iframeId: string) => {
    const iframes = removeIframe(store.iframes, containerId, iframeId);
    setStore({ ...store, iframes });
  };
};

export default useRemoveIframe;
