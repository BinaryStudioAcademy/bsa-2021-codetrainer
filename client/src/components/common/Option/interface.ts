import { ISelectValue } from 'components/common/Select/interface';

export interface IOption {
	value: ISelectValue;
	isActive: boolean;
	onChange: (value: ISelectValue) => void;
}
