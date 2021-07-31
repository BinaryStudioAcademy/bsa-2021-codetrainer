import { ISelectValue } from 'components/common/select/interface';

export interface IOptionProps {
	value: ISelectValue;
	isActive: boolean;
	onChange: (value: ISelectValue) => void;
}
