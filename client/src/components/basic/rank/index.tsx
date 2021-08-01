import React from 'react';
import { Tag } from '@blueprintjs/core';
import styles from './rank.module.scss';
import clsx from 'clsx';

interface IRankProps {
	rank: number;
	classList?: string;
}

const Rank: React.FC<IRankProps> = ({ rank, classList = '' }) => {
	const colorList = ['blue', 'yellow', 'red'];
	const color = colorList[Math.floor((rank - 1) / 3)];
	const tagStyles = clsx(styles.tag, styles[color], classList);

	return <Tag className={tagStyles}>{rank} rank</Tag>;
};

export default Rank;
