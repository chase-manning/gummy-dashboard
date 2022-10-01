import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../helpers/id-helper";
import { RootState } from "./store";

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

export interface CoreState {
  iframes: Container;
}

const initialState: CoreState = {
  iframes: {
    id: "root",
    type: "container",
    direction: "row",
    children: [],
  },
};

interface AddIframe {
  containerId: string;
  iframeId: string;
  iframe: IframeType;
  position: "left" | "right" | "top" | "bottom";
}

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    addIframe: (state, action: PayloadAction<AddIframe>) => {
      const { containerId, iframe, position } = action.payload;

      let container: any;
      if (state.iframes.id === containerId) {
        container = state.iframes;
      } else {
        for (const child of state.iframes.children) {
          if (child.id === containerId) {
            container = child;
            break;
          }
          if (child.type === "iframe") continue;
          for (const grandChild of (child as any).children) {
            if (grandChild.id === containerId) {
              container = grandChild;
              break;
            }
            for (const grandGrandChild of grandChild.children) {
              if (grandGrandChild.id === containerId) {
                container = grandGrandChild;
                break;
              }
            }
          }
        }
      }

      if (!container) {
        throw new Error("Container not found");
      }

      const isNewLR = position === "left" || position === "right";
      const isCurentLR = container.direction === "row";

      // Adding if first child
      if (container.children.length === 0) {
        container.children.push(iframe);
        return;
      }

      const source = container.children.findIndex(
        (child: IframeType) => child.id === action.payload.iframeId
      );
      // If adding an iframe to existing container
      if (isNewLR === isCurentLR) {
        if (position === "left" || position === "top") {
          container.children.splice(source, 0, action.payload.iframe);
        } else {
          container.children.splice(source + 1, 0, action.payload.iframe);
        }
        return;
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
    },
  },
});

export const { addIframe } = coreSlice.actions;

export const selectIframes = (state: RootState) => state.core.iframes;

export default coreSlice.reducer;
