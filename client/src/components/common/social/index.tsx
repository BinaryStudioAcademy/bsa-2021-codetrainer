import React from 'react';
import styles from './social.module.scss';
import defaultUserPhoto from 'assets/icons/user.svg';
import { Rank } from 'components/basic';
import { IUser } from 'typings/common/IUser';

interface ISocialProps {
	user: IUser;
}

const Social: React.FC<ISocialProps> = ({ user: { rank, profileUrl, name, clan, honor } }) => {
	return (
		<div className={styles.userRow}>
			<Rank rank={rank} />
			<img className={styles.userImage} src={profileUrl || defaultUserPhoto} alt={name} />
			<span>{name}</span>
			<span>{clan?.name}</span>
			<span>{honor}</span>
		</div>
	);
};

export default Social;
