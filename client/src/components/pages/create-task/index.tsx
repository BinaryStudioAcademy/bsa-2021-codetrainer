import React from 'react';
import CreateTaskSettings from './create-task-settings';
interface ICreateTaskProps {}

const CreateTaskPage: React.FC<ICreateTaskProps> = () => (
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

export default CreateTaskPage;
