import React from 'react';
import styles from './rank.module.scss';

interface IRankProps {
	difficulty: number;
}

const Rank: React.FC<IRankProps> = (props) => {
	return <div className={`${styles.rank} ${styles[props.difficulty]}`}>{props.difficulty} rank</div>;
};

export default Rank;
