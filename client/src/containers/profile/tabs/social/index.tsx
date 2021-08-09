// import { ProfileTasks as Tasks } from 'components';
// import IChallengeProps from 'components/common/challenge/types';



import React, { useState, useMemo } from 'react';
import { Social, ProfileTabWithSidebar } from 'components';
import { IUser } from 'typings/common/IUser';


interface IProfileSocial {
	social: {
		title: string;
		id: string;
		users: IUser[];
	}[];
}

export const ProfileSocial: React.FC<IProfileSocial> = ({ social }) => {
	const [activeId, setActiveId] = useState<string>(social[0].id);
	const sideBar = useMemo(
		() => social.map(({ title, id, users }) => ({ id, title, count: users.length })),
		[social],
	);
	const items = social.find(({ id }) => id === activeId)?.users || [];

	return (
		<ProfileTabWithSidebar
			sideBar={{
				sideBar,
				activeId,
				onClick: (id: string) => setActiveId(id),
			}}
		>
			<div>
				{items.map((item, index) => <Social key={index.toString()} user={item} />)}
			</div>
		</ProfileTabWithSidebar>
	);
};
