import React from 'react';
import { IChallenge } from 'components/common/challenge/types';
import { Challenge } from 'components';

import styles from './challenges-list.module.scss';

interface IChallenges {
	challenges: IChallenge[];
	count: number;
}

const ChallengesList: React.FC<IChallenges> = ({ challenges, count }) => {
	return (
		<div>
			<p className={styles.challengesAmount}>
				{count} {String(count).slice(-1) === '1' ? 'challenge' : 'challenges'} found.
			</p>
			{challenges.map((challenge) => (
				<Challenge key={challenge.id} {...challenge} />
			))}
		</div>
	);
};

export default ChallengesList;
