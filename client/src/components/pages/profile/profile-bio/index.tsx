import React from 'react';
import styles from './profile-bio.module.scss';
import { Avatar, Label, List, Rank } from 'components/basic';

export interface IProfileBioProps {
	img?: string;
	name: string;
	nickname: string;
	clan?: string;
	memberSince: string;
	lastSeen: string;
	gitHubUrl?: string;
	followingQuantity: number;
	followersQuantity: number;
	communityQuantity: number;
	rank: number;
	score: number;
}

export const ProfileBio = (props: IProfileBioProps) => {
	const {
		img,
		name,
		nickname,
		clan,
		memberSince,
		lastSeen,
		gitHubUrl,
		followingQuantity,
		followersQuantity,
		communityQuantity,
		rank,
		score,
	} = props;

	const gitHubLink = gitHubUrl ? (
		<a href={'https://github.com/' + name} className={styles.link}>
			{gitHubUrl}
		</a>
	) : (
		gitHubUrl
	);

	const listItems1 = [
		{ name: 'Name', value: nickname },
		{ name: 'Clan', value: clan },
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
				<h5 className={styles.name}>{name}</h5>
				<Rank rank={rank} />
				<Label label={score} color="#EC4179" />
			</div>
			<div className={styles.fields}>
				<List items={listItems1} />
				<List items={listItems2} />
				<List items={listItems3} />
			</div>
		</div>
	);
};
