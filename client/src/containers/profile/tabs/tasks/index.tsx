import React, { useState, useMemo } from 'react';
import { ProfileTasks as Tasks, ProfileTabWithSidebar } from 'components';
import { IChallenge } from 'components/common/challenge/types';

interface IProfileTasks {
	updateTaskFavoriteStatus: (id: string) => void;
	profileTasks: {
		title: string;
		id: string;
		empty: string;
		tasks?: IChallenge[];
	}[];
}

export const ProfileTasks: React.FC<IProfileTasks> = ({ profileTasks, updateTaskFavoriteStatus }) => {
	const [activeId, setActiveId] = useState<string>(profileTasks[0].id);
	const sideBar = useMemo(
		() => profileTasks.map(({ title, id, tasks }) => ({ id, title, count: tasks?.length })),
		[profileTasks],
	);
	const tasks = profileTasks.find(({ id }) => id === activeId)?.tasks || [];
	const empty = profileTasks.find(({ id }) => id === activeId)?.empty;

	return (
		<ProfileTabWithSidebar
			sideBar={{
				sideBar,
				activeId,
				onClick: (id: string) => setActiveId(id),
			}}
		>
			<Tasks tasks={tasks} emptyTasks={empty} updateTaskFavoriteStatus={updateTaskFavoriteStatus} />
		</ProfileTabWithSidebar>
	);
};
