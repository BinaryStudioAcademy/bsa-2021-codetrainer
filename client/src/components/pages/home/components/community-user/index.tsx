import React from 'react';
import { Text } from '@blueprintjs/core';
import styles from './community-user.module.scss';
import defaultUserPhoto from './assets/user.svg';
import { Rank } from 'components/basic';

interface ICommunityUserProps {
	rank: number;
	imageSource: string;
	name: string;
}

const CommunityUser: React.FC<ICommunityUserProps> = ({ imageSource, name, rank }) => {
	return (
		<div className={styles.userRow}>
			<Rank rank={rank} />
			<img className={styles.userImage} src={imageSource || defaultUserPhoto} alt={name} />
			<Text className={styles.name}>{name}</Text>
		</div>
	);
};

export default CommunityUser;
