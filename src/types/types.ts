export enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

export type SliceDataType = {
  name: string;
  age: number;
  mail: string;
  password: string;
  gender: GenderEnum;
  image: string;
  terms: boolean;
};

export interface IFormValues {
  name: string;
  mail: string;
  age: number;
  password: string;
  passwordSubmit: string;
  country: string;
  terms: boolean;
  gender: string;
}
