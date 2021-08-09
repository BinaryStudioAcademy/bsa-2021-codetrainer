import React from 'react';
import styles from './social.module.scss';
import defaultUserPhoto from 'assets/icons/user.svg';
import { Rank } from 'components/basic';
import { IUser } from 'components/pages/home/components/community/interfce';

interface ISocialProps {
	user: IUser;
}

const Social: React.FC<ISocialProps> = ({ user: {
    rank,
    imageSource,
    name,
    clan,
    honor
} }) => {
	return (
		<div className={styles.userRow}>
			<Rank rank={rank} />
			<img className={styles.userImage} src={imageSource || defaultUserPhoto} alt={name} />
			<span >{clan}</span>
            <span>{honor}</span>
		</div>
	);
};

export default Social;
