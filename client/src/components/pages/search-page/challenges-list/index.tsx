import React from 'react';
import { IChallenge } from 'components/common/challenge/types';
import { Challenge } from 'components';

import styles from './challenges-list.module.scss';

interface IChallenges {
	challenges: IChallenge[];
	count: number;
	handleFetchCollections: () => void;
	handleChallengeClick: (id: string) => void;
}

const ChallengesList: React.FC<IChallenges> = ({ challenges, count, handleFetchCollections, handleChallengeClick }) => {
	return (
		<div>
			<p className={styles.challengesAmount}>
				{count} {String(count).slice(-1) === '1' ? 'challenge' : 'challenges'} found.
			</p>
			{challenges.map((challenge) => (
				<Challenge
					key={challenge.id}
					{...challenge}
					handleFetchCollections={handleFetchCollections}
					handleChallengeClick={handleChallengeClick}
				/>
			))}
		</div>
	);
};

export default ChallengesList;
