import React from 'react';
import styles from './challenge-tag.module.scss';

const ChallengeTag: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div className={styles.challengeTag}>
			<span className={styles.challengeTagText}>{text}</span>
		</div>
	);
};

export default ChallengeTag;
