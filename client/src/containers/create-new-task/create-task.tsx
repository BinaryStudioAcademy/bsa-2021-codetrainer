import React from 'react';
import { CreateSettings } from './create-task-settings';

export interface ICreateTaskProps {}

export const CreateTask = (props: ICreateTaskProps) => {
	return (
		<>
			{/* Header sidebar etc */}
			<CreateSettings />
		</>
	);
};
