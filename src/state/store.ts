import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import coreReducer from "./coreSlice";

export const store = configureStore({
  reducer: {
    core: coreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
