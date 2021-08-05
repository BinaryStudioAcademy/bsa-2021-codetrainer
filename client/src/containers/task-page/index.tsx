import React from 'react';
import { TaskInstructions } from '../../components/basic';
import { mockData } from '../../components/basic/task-instructions/mockData';

const TaskPage: React.FC = (props) => {
	const [activeTab, setActiveTab] = React.useState('instructions');

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '50%' }}>
				<TaskInstructions data={mockData} activeTab={activeTab} onClick={(tab: string) => setActiveTab(tab)} />
			</div>
			<div style={{ width: '50%', background: '#705ff5' }}>Solution</div>
		</div>
	);
};

export default TaskPage;
