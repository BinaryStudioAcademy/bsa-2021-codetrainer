import React from 'react';
import { TaskInstructions } from '../../components/common';
import { mockData } from '../../components/common/task-instructions/mockData';

const TaskPage: React.FC = (props) => {
	const [activeTab, setActiveTab] = React.useState('instructions');

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '800px' }}>
				<TaskInstructions data={mockData} activeTab={activeTab} onClick={(tab: string) => setActiveTab(tab)} />
			</div>
			<div style={{ width: '554px', background: '#705ff5' }}>Solution</div>
		</div>
	);
};

export default TaskPage;
