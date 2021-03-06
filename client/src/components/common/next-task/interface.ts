import { ISelectValue } from '../../basic/select/interface';

export interface ITag {
	id: string;
	name: string;
}
export interface ITask {
	id: string;
	name: string;
	discipline?: string;
	description?: string;
	exampleTestCases?: string;
	rank: number;
	tags: ITag[];
}

export interface INextTaskProps {
	task?: ITask | null;
	focusValues: ISelectValue[];
	activeFocusValue: ISelectValue;
	setActiveFocusValue?: React.Dispatch<React.SetStateAction<ISelectValue>>;
	handleTrainClick: () => void;
	handleSkipClick: () => void;
	onChangeSelect: (value: number) => void;
}
