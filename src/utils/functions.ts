import {
  ActionCreatorWithPayload,
  AnyAction,
  Dispatch,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import * as yup from "yup";
import { SliceDataType } from "../types/types";
import {
  imageHeightSchema,
  imageSizeSchema,
  imageWidthSchema,
} from "../Validations/Validation";

export async function validateString(
  ref: React.RefObject<HTMLInputElement>,
  schema: yup.StringSchema<string, yup.AnyObject, undefined, "">,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
  dispatch: ThunkDispatch<
    {
      control: SliceDataType;
      uncontrol: SliceDataType;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  action: ActionCreatorWithPayload<string, string>,
) {
  if (ref.current) {
    try {
      await schema.validate(ref.current.value);
      dispatch(action(ref.current.value));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorState(error.errors[0]);
      }
    }
  }
}

export async function validateNumber(
  ref: React.RefObject<HTMLInputElement>,
  schema: yup.NumberSchema<number, yup.AnyObject, undefined, "">,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
  dispatch: ThunkDispatch<
    {
      control: SliceDataType;
      uncontrol: SliceDataType;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  action: ActionCreatorWithPayload<number, string>,
) {
  if (ref.current) {
    try {
      await schema.validate(Number(ref.current.value));
      dispatch(action(Number(ref.current.value)));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorState(error.errors[0]);
      }
    }
  }
}

export async function validateBoolean(
  ref: React.RefObject<HTMLInputElement>,
  schema: yup.NumberSchema<number, yup.AnyObject, undefined, "">,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
  dispatch: ThunkDispatch<
    {
      control: SliceDataType;
      uncontrol: SliceDataType;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  action: ActionCreatorWithPayload<boolean, string>,
) {
  if (ref.current) {
    try {
      await schema.validate(ref.current.checked);
      dispatch(action(ref.current.checked));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorState(error.errors[0]);
      }
    }
  }
}

export function comparePasswords(
  passwordRef: React.RefObject<HTMLInputElement>,
  submitPasswordRef: React.RefObject<HTMLInputElement>,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
) {
  if (passwordRef.current && submitPasswordRef.current) {
    if (passwordRef.current.value !== submitPasswordRef.current.value) {
      setErrorState("Passwords should be equal");
    }
  }
}

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export async function validateImage(
  ref: React.RefObject<HTMLInputElement>,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
  dispatch: ThunkDispatch<
    {
      control: SliceDataType;
      uncontrol: SliceDataType;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  action: ActionCreatorWithPayload<string, string>,
) {
  if (ref.current && ref.current.files) {
    const file = ref.current.files[0];
    if (!file) {
      setErrorState("No file found");
      return;
    }
    const size = file.size;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = async function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        try {
          await imageWidthSchema.validate(width);
          await imageHeightSchema.validate(height);
          await imageSizeSchema.validate(size);
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            setErrorState(error.errors[0]);
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    dispatch(action(reader.result as string));
  }
}
