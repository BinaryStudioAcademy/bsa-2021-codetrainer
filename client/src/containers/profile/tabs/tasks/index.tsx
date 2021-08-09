import React, { useState, useMemo } from 'react';
import { Challenge, ProfileTabWithSidebar } from 'components';
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
	const items = profileTasks.find(({ id }) => id === activeId)?.tasks || [];

	return (
		<ProfileTabWithSidebar
			sideBar={{
				sideBar,
				activeId,
				onClick: (id: string) => setActiveId(id),
			}}
		>
			{items.map((item, index) => <Challenge key={index.toString()} challenge={item} />)}
		</ProfileTabWithSidebar>
	);
};
