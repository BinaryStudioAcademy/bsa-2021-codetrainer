import { ISelectValue } from '../../types';

export interface IOptionProps {
	value: ISelectValue;
	isActive: boolean;
	onChange: (value: ISelectValue) => void;
}
