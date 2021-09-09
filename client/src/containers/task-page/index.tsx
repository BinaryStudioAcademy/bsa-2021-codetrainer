import React from 'react';
import { TaskInstructions } from '../../components/common';
import { mockData } from '../../components/common/task-instructions/mockData';
import './task-page.scss';

const TaskPage: React.FC = (props) => {
	const [activeTab, setActiveTab] = React.useState('instructions');

	return (
		<div className="taskBlock">
			<div className="taskDescription">
				<TaskInstructions data={mockData} activeTab={activeTab} onClick={(tab: string) => setActiveTab(tab)} />
			</div>
			<div className="taskSolution">Solution</div>
		</div>
	);
};

export default TaskPage;
