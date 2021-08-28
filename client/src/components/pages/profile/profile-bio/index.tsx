import React from 'react';
import styles from './profile-bio.module.scss';
import { Avatar, Label, List, Rank } from 'components/basic';
import { IUser } from 'typings/common/IUser';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { getMonthName } from 'helpers/date';

export type IProfileBioProps = IUser & {
	followingQuantity?: number;
	followersQuantity?: number;
	communityQuantity?: number;
	score?: number;
};

export const ProfileBio = ({
	avatar,
	name,
	surname,
	username,
	clan,
	createdAt,
	lastVisit,
	github,
	followingQuantity,
	followersQuantity,
	communityQuantity,
	rank,
	score,
}: IProfileBioProps) => {
	const gitHubLink = github ? (
		<a href={github.url} target="_blank" rel="nofollow noreferrer" className={styles.link}>
			{github.login}
		</a>
	) : (
		'Github account not connected'
	);

	const listItems1 = [
		{ name: 'Name', value: username },
		{ name: 'Clan', value: clan?.id ? <Link to={`${ROUTES.Clan}/${clan.id}`}>{clan?.name}</Link> : 'No clan' },
	];
	const listItems2 = [
		{ name: 'Member since', value: createdAt && `${new Date(createdAt).getDate()} ${getMonthName(new Date(createdAt))} ${new Date(createdAt).getFullYear()}` },
		{ name: 'Last seen', value: lastVisit },
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
				{avatar ? <Avatar avatar={avatar} size={57} /> : <Avatar size={57} />}
				<h5 className={styles.name}>{`${name} ${surname}`}</h5>
				<Rank rank={rank ? rank : 9} />
				<Label label={score ? score : 0} color="#EC4179" />
			</div>
			<div className={styles.fields}>
				<List items={listItems1} />
				<List items={listItems2} />
				<List items={listItems3} />
			</div>
		</div>
	);
};
