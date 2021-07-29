import React from 'react';
import { Tag } from '@blueprintjs/core';

import styles from './rank.module.scss';

interface Props {
	rank: number;
	classList?: string;
}

const Rank: React.FC<Props> = ({ rank, classList = '' }) => {
	const colorList = ['blue', 'yellow', 'red'];
	const color = colorList[Math.floor((rank - 1) / 3)];

	return <Tag className={`${styles.tag} ${styles[color]} ${classList}`}>{rank} rank</Tag>;
};

export default Rank;
