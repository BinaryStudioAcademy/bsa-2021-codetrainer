import React from 'react';
import CreateTaskSettings from './create-task-settings';
interface ICreateTaskProps {}

export const CreateTaskPage = (props: ICreateTaskProps) => {
	return (
		<div>
			{/*
			<Header />
			<Sidebar />
		*/}
			<CreateTaskSettings />
			{/*
			Solution block here
			Description block here
			Tests block here
			Buttons block here
		*/}
		</div>
	);
};
