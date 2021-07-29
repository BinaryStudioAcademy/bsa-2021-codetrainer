import { ISelectValue } from "components/Select/interface";

export interface IOption {
  value: ISelectValue,
  isActive: boolean,
  onChange: (value: ISelectValue) => void,
}