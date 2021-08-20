import React from 'react';
import styles from './profile-bio.module.scss';
import { Avatar, Label, List, Rank } from 'components/basic';
import { IUser } from 'typings/common/IUser';

export type IProfileBioProps = IUser & {
	followingQuantity?: number;
	followersQuantity?: number;
	communityQuantity?: number;
	memberSince?: string;
	lastSeen?: string;
	score?: number;
};

export const ProfileBio = (props: IProfileBioProps) => {
	const {
		img,
		name,
		surname,
		username,
		clan,
		memberSince,
		lastSeen,
		github,
		followingQuantity,
		followersQuantity,
		communityQuantity,
		rank,
		score,
	} = props;

	const gitHubLink = github ? (
		<a href={github.profileUrl} className={styles.link}>
			{github.profileUrl}
		</a>
	) : (
		'Github account not connected'
	);

	const listItems1 = [
		{ name: 'Name', value: username },
		{ name: 'Clan', value: clan?.name ?? 'No clan' },
	];
	const listItems2 = [
		{ name: 'Member since', value: memberSince },
		{ name: 'Last seen', value: lastSeen },
		{ name: 'Profile GitHub', value: gitHubLink },
	];
	const listItems3 = [
		{ name: 'Following', value: followingQuantity },
		{ name: 'Followers', value: followersQuantity },
		{ name: 'Community', value: communityQuantity },
	];

	return (
		<div className={styles.profileBio}>
			<div className={styles.profileHeader}>
				{img ? <Avatar avatar={img} size={57} /> : <Avatar size={57} />}
				<h5 className={styles.name}>{`${name} ${surname}`}</h5>
				<Rank rank={rank} />
				<Label label={score ?? 0} color="#EC4179" />
			</div>
			<div className={styles.fields}>
				<List items={listItems1} />
				<List items={listItems2} />
				<List items={listItems3} />
			</div>
		</div>
	);
};
