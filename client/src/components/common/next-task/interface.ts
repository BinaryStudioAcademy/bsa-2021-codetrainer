import { ISelectValue } from '../../basic/select/interface';

export interface ITask {
	title: string;
	description: string;
	rank: number;
	tags: string[];
}

export interface INextTaskProps {
	task: ITask;
	focusValues: ISelectValue[];
	activeFocusValue: ISelectValue;
	setActiveFocusValue: React.Dispatch<React.SetStateAction<ISelectValue>>;
	handleTrainClick: () => void;
	handleSkipClick: () => void;
}
