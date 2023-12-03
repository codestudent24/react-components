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

export async function isValidString(
  value: string,
  schema: yup.StringSchema<string, yup.AnyObject, undefined, "">,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    await schema.validate(value);
    setErrorState("");
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      setErrorState(error.errors[0]);
    }
    return false;
  }
}

export async function isValidNumber(
  value: number,
  schema: yup.NumberSchema<number, yup.AnyObject, undefined, "">,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    await schema.validate(value);
    setErrorState("");
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      setErrorState(error.errors[0]);
    }
    return false;
  }
}

export async function isValidBoolean(
  value: boolean,
  schema: yup.BooleanSchema<boolean | undefined, yup.AnyObject, undefined, "">,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    await schema.validate(value);
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      setErrorState(error.errors[0]);
    }
    setErrorState("");
    return false;
  }
}

export function comparePasswords(
  password: string,
  submitPassword: string,
  setErrorState: React.Dispatch<React.SetStateAction<string>>,
) {
  if (password !== submitPassword) {
    setErrorState("Passwords should be equal");
    return false;
  }
  setErrorState("");
  return true;
}

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export async function validateImage(
  file: File | undefined,
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
        setErrorState("");
        const base64 = await convertToBase64(file);
        if (typeof base64 === "string") dispatch(action(base64));
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          setErrorState(error.errors[0]);
        }
      }
    };
    img.src = event.target?.result as string;
  };
  reader.readAsDataURL(file);
}

export const convertToBase64 = (
  file: Blob,
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error: unknown) => {
      reject(error);
    };
  });
};
