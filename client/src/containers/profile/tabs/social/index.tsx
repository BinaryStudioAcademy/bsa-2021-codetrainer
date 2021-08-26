import React, { useState, useMemo } from 'react';
import { ProfileTabWithSidebar } from 'components';
import { ProfileSocialList } from 'components/pages/profile/profile-social-list';
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
	const sideBar = useMemo(() => social.map(({ title, id, users }) => ({ id, title, count: users.length })), [social]);
	const items = social.find(({ id }) => id === activeId)?.users || [];
	return (
		<ProfileTabWithSidebar
			sideBar={{
				sideBar,
				activeId,
				onClick: (id: string) => setActiveId(id),
			}}
		>
			<ProfileSocialList items={items} infoType={activeId} />
		</ProfileTabWithSidebar>
	);
};
