import React from 'react';
import styles from './challenge-tags-lise.module.scss';
import ChallengeTag from './challenge-tag';
import { TChallengeTagsProps } from '../types';

const ChallengeTagsList: React.FC<{ tags: TChallengeTagsProps }> = ({ tags }) => {
	return (
		<div className={styles.challengeTagsList}>
			{tags.map((tag: string, index: number) => (
				<ChallengeTag text={tag} key={index} />
			))}
		</div>
	);
};

export default ChallengeTagsList;
