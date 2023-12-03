import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialSliceState } from "./controlledSlice";
import { GenderEnum } from "../types/types";

export const uncontrolledSlice = createSlice({
  name: "uncontrolled",
  initialState: initialSliceState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
    setMail(state, action: PayloadAction<string>) {
      state.mail = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setGender(state, action: PayloadAction<GenderEnum>) {
      state.gender = action.payload;
    },
    setImage(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.image = action.payload;
    },
    setTerms(state, action: PayloadAction<boolean>) {
      state.terms = action.payload;
    },
  },
});

export const {
  setName,
  setAge,
  setMail,
  setPassword,
  setGender,
  setImage,
  setTerms,
} = uncontrolledSlice.actions;
