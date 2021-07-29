import React from 'react';
import styles from './index.module.scss';

const ChallengeTag: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div className={styles['challenge-tag']}>
			<span className={styles['challenge-tag__text']}>{text}</span>
		</div>
	);
};

export default ChallengeTag;
