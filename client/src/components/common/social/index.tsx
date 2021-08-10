import React from 'react';
import defaultUserPhoto from 'assets/icons/user.svg';
import { Rank } from 'components/basic';
import { ISocialProps } from './types';
import styles from './social.module.scss';

const Social: React.FC<ISocialProps> = ({ user: { rank, imageSource, name, clan, honor } }) => {
	return (
		<div className={styles.userRow}>
			<Rank rank={rank} />
			<img className={styles.userImage} src={imageSource || defaultUserPhoto} alt={name} />
			<span>{name}</span>
			<span>{clan}</span>
			<span>{honor}</span>
		</div>
	);
};

export default Social;
