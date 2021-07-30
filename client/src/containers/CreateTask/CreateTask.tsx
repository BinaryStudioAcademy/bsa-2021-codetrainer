import React from 'react';
import CreateTaskSettings from './CreateTaskSettings';
interface ICreateTaskProps {}

const CreateTask: React.FC<ICreateTaskProps> = () => (
	<div>
		{/* <Header/>
        <Sidebar/> */}
		<CreateTaskSettings />
		{/* Solition block here
        Description block here
        Tests block here
        Buttons block here */}
	</div>
);

export default CreateTask;
