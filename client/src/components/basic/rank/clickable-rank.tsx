import React from 'react';
import clsx from 'clsx';
import { mapRankToStyle } from './helpers';

import styles from './rank.module.scss';

interface IClickableRank {
	rank: number;
	onChange: () => void;
	active?: boolean;
}

export const ClickableRank: React.FC<IClickableRank> = ({ rank, onChange, active }) => (
	<span
		className={clsx(styles.rank, styles.rank__clickable, mapRankToStyle({ rank, active }))}
		onClick={() => onChange()}
	>
		{rank} rank
	</span>
);
