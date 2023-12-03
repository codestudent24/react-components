import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SliceDataType, GenderEnum } from "../types/types";

export const initialSliceState: SliceDataType = {
  name: "",
  age: 0,
  mail: "",
  password: "",
  gender: GenderEnum.male,
  image: "",
  terms: false,
};

export const controlledSlice = createSlice({
  name: "controlled",
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
      state.image = action.payload;
    },
    setTerms(state, action: PayloadAction<boolean>) {
      state.terms = action.payload;
    },
  },
});
