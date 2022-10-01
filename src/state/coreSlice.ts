import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      let container: any;
      if (state.iframes.id === action.payload.containerId) {
        container = state.iframes;
      } else {
        for (const child of state.iframes.children) {
          if (child.id === action.payload.containerId) {
            container = child;
            break;
          }
          if (child.type == "iframe") continue;
          for (const grandChild of (child as any).children) {
            if (grandChild.id === action.payload.containerId) {
              container = grandChild;
              break;
            }
            for (const grandGrandChild of grandChild.children) {
              if (grandGrandChild.id === action.payload.containerId) {
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

      const { containerId, iframe, position } = action.payload;
      const isNewLR = position === "left" || position === "right";
      const isCurentLR = container.direction === "row";
      if (isNewLR && isCurentLR) {
        if (container.children.length === 0) {
          container.children.push(iframe);
          return;
        }
        const source = container.children.findIndex(
          (child: IframeType) => child.id === action.payload.iframeId
        );
        if (position === "left") {
          container.children.splice(source, 0, action.payload.iframe);
        } else {
          container.children.splice(source + 1, 0, action.payload.iframe);
        }
      }
      // TODO
    },
  },
});

export const { addIframe } = coreSlice.actions;

export const selectIframes = (state: RootState) => state.core.iframes;

export default coreSlice.reducer;
