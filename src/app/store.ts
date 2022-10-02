import { useQueryParam } from "use-query-params";

export interface IframeType {
  id: string;
  url: string;
  type: "iframe";
}

export type Child = Container | IframeType;

export interface Container {
  type: "container";
  id: string;
  direction: "row" | "column";
  children: Child[];
}

export interface Store {
  iframes: Container;
}

const initialStore: Store = {
  iframes: {
    id: "root",
    type: "container",
    direction: "row",
    children: [],
  },
};

const useStore = () => {
  const [rawStore, setRawStore] = useQueryParam<string>("store");

  const store: Store = rawStore ? JSON.parse(rawStore) : initialStore;

  return {
    store,
    setStore: (store: Store) => setRawStore(JSON.stringify(store)),
  };
};

export default useStore;
