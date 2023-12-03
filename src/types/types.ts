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
