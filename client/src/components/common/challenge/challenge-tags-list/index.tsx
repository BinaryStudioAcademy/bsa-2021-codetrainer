import React from 'react';
import styles from './index.module.scss';
import ChallengeTag from './challenge-tag';
import { IChallengeTags } from '../types';

const ChallengeTagsList: React.FC<{ tags: IChallengeTags }> = ({ tags }) => {
	return (
		<div className={styles['challenge-tags-list']}>
			{tags.map((tag: string, index: number) => (
				<ChallengeTag text={tag} key={index} />
			))}
		</div>
	);
};

export default ChallengeTagsList;
