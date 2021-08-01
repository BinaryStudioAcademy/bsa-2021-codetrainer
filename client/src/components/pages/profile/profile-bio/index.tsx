import React from 'react';
import { H5 } from '@blueprintjs/core';
import styles from './profile-bio.module.scss';
import { List } from 'components/basic';

export interface IProfileBioProps {
	img: string;
	name: string;
	nickname: string;
	clan?: string;
	memberSince: string;
	lastSeen: string;
	gitHub?: string;
	followingQuantity: number;
	followersQuantity: number;
	communityQuantity: number;
}

export const ProfileBio: React.FC<IProfileBioProps> = (props) => {
	const {
		img,
		name,
		nickname,
		clan,
		memberSince,
		lastSeen,
		gitHub,
		followingQuantity,
		followersQuantity,
		communityQuantity,
	} = props;

	const gitHubLink = gitHub ? (
		<a href={'https://github.com/' + name} className={styles.link}>
			{gitHub}
		</a>
	) : (
		gitHub
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
				<img src={img} className={styles.avatar} />
				<H5>{name}</H5>
			</div>
			<div className={styles.fields}>
				<List items={listItems1} />
				<List items={listItems2} />
				<List items={listItems3} />
			</div>
		</div>
	);
};
