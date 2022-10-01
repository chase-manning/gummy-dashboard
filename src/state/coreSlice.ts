import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IframeType } from "../components/IFrame";
import { RootState } from "./store";

export interface CoreState {
  iframes: IframeType[];
}

const initialState: CoreState = {
  iframes: [],
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    addIframe: (state, action: PayloadAction<IframeType>) => {
      state.iframes.push(action.payload);
    },
    removeIframe: (state, action: PayloadAction<IframeType>) => {
      state.iframes = state.iframes.filter(
        (iframe) => iframe.id !== action.payload.id
      );
    },
  },
});

export const { addIframe, removeIframe } = coreSlice.actions;

export const selectIframes = (state: RootState) => state.core.iframes;

export default coreSlice.reducer;
