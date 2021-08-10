import React from 'react';
import styles from './challenge-tags-list.module.scss';
import ChallengeTag from './challenge-tag';

interface IChallengeTagsListProps {
	tags: string[];
}
const ChallengeTagsList = ({ tags }: IChallengeTagsListProps) => {
	return (
		<div className={styles.challengeTagsList}>
			{tags.map((tag: string, index: number) => (
				<ChallengeTag text={tag} key={index} />
			))}
		</div>
	);
};

export default ChallengeTagsList;
