import React from 'react';
import clsx from 'clsx';
import styles from './rank.module.scss';
import { mapRankToStyle } from './helpers';
import { TRankProps } from './types';

const Rank: React.FC<TRankProps> = ({ rank, honor }) => (
	<div className={clsx(styles.rank, mapRankToStyle(rank))}>{rank !== undefined ? `${rank} rank` : honor}</div>
);

export default Rank;
