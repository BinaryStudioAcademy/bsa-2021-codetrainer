import { TSvgFC } from 'containers/create-new-task/data';
import React from 'react';

export interface ISelectValue {
	id: string | null;
	title: string;
	icon?: string;
	iconFC?: TSvgFC;
	iconM?: React.ElementType;
}

export interface ISelectProps {
	className?: string;
	values: ISelectValue[];
	activeValue?: ISelectValue;
	onChange?: (value: ISelectValue) => void;
	isButtonBlockSelect?: boolean;
}
