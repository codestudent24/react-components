import * as yup from "yup";

const requiredMessage = "Field is required";

export const ageSchema = yup
  .number()
  .required(requiredMessage)
  .positive("Should be positive");

export const mailSchema = yup.string().required(requiredMessage).email();

export const nameSchema = yup
  .string()
  .matches(/^[A-Z]/, "First letter should be capital")
  .required(requiredMessage);

export const passwordSchema = yup
  .string()
  .required(requiredMessage)
  .min(4)
  .matches(/\d/, "Should contain digit")
  .matches(/[A-Z]/, "Should contain uppercase letter")
  .matches(/[a-z]/, "Should contain lowercase letter")
  .matches(/[^a-zA-Z0-9\s]/, "Should contain special symbol");

export const genderSchema = yup.string().required();

export const termsSchema = yup.boolean();

export const countrySchema = yup.string().required();

export const imageWidthSchema = yup
  .number()
  .required("width is undefined")
  .lessThan(1921, "Width should not be more than 1920 px");

export const imageHeightSchema = yup
  .number()
  .required("height is undefined")
  .lessThan(1081, "Height should not be more than 1080 px");

export const imageSizeSchema = yup
  .number()
  .required("size is undefined")
  .lessThan(2097153, "Size should not be more than 2 Mb");
