import { ISelectValue } from 'components/common/select/interface';

export interface IOption {
	value: ISelectValue;
	isActive: boolean;
	onChange: (value: ISelectValue) => void;
}
