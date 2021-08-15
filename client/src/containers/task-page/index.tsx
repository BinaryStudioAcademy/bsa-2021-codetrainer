import React from 'react';
import { TaskInstructions } from '../../components/common';
import { mockData } from '../../components/common/task-instructions/mockData';

const TaskPage: React.FC = (props) => {
	const [activeTab, setActiveTab] = React.useState('instructions');

	return (
		<div style={{ display: 'flex', width: '916px' }}>
			<div style={{ width: '50%' }}>
				<TaskInstructions data={mockData} activeTab={activeTab} onClick={(tab: string) => setActiveTab(tab)} />
			</div>
			<div>Solution</div>
		</div>
	);
};

export default TaskPage;
