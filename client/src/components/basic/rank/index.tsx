import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './rank.module.scss';
import { mapRankToStyle } from './helpers';

type TRankProps = { rank: number; honor?: never } | { rank?: never; honor: number };

const Rank: FC<TRankProps> = (props) => (
	<div className={clsx(styles.rank, mapRankToStyle({ rank: props.rank }))}>
		<span>{props.rank !== undefined ? `${props.rank} rank` : props.honor}</span>
	</div>
);

export default Rank;
