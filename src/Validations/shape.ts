import { InferType, boolean, number, object, ref, string } from "yup";

const requiredMessage = "Field is required";

export const schema = object().shape({
  name: string()
    .matches(/^[A-Z]/, "First letter should be capital")
    .required(requiredMessage),
  age: number().required(requiredMessage).positive("Should be positive"),
  mail: string().required(requiredMessage).email(),
  password: string()
    .required(requiredMessage)
    .min(4)
    .matches(/\d/, "Should contain digit")
    .matches(/[A-Z]/, "Should contain uppercase letter")
    .matches(/[a-z]/, "Should contain lowercase letter")
    .matches(/[^a-zA-Z0-9\s]/, "Should contain special symbol"),
  passwordSubmit: string()
    .required(requiredMessage)
    .oneOf([ref("password"), ""], "Passwords don't match. Please try again"),
  gender: string().required(requiredMessage),
  terms: boolean().oneOf([true], "should accept T&C"),
  country: string().required(requiredMessage),
});

export type FormData = InferType<typeof schema>;
