import React, { useState, useMemo } from 'react';
import { ProfileTasks as Tasks } from 'components';
import IChallengeProps from 'components/common/challenge/types';

interface IProfileTasks {
	profileTasks: {
		title: string;
		id: string;
		tasks: IChallengeProps[];
	}[];
}

export const ProfileTasks: React.FC<IProfileTasks> = ({ profileTasks }) => {
	const [activeId, setActiveId] = useState<string>(profileTasks[0].id);
	const sideBar = useMemo(
		() => profileTasks.map(({ title, id, tasks }) => ({ id, title, count: tasks.length })),
		[profileTasks],
	);
	return (
		<Tasks
			sideBar={{
				sideBar,
				activeId,
				onClick: (id) => setActiveId(id),
			}}
			tasks={profileTasks.find(({ id }) => id === activeId)?.tasks || []}
		/>
	);
};
