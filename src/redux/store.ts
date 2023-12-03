import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { controlledSlice } from "./controlledSlice";
import { uncontrolledSlice } from "./uncontrolledSlice";

const store = configureStore({
  reducer: {
    control: controlledSlice.reducer,
    uncontrol: uncontrolledSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
