import React from 'react';
import RankTag from 'components/common/rank-tag';
import { IChallengeHeader } from '../types';
import styles from './index.module.scss';

const ChallengeHeader: React.FC<{ header: IChallengeHeader }> = ({ header: { title, rank } }) => {
	return (
		<div className={styles['challenge-header']}>
			<RankTag rank={rank} />
			<span className={styles['challenge-header__title']}>{title}</span>
		</div>
	);
};

export default ChallengeHeader;
