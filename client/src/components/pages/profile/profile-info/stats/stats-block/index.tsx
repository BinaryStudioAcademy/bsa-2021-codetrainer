import React from 'react';
import styles from './stats-block.module.scss';

interface IStatsBlock {
	icon: string,
	title: string
}

export const StatsBlock: React.FC<IStatsBlock> = (props) => {

	const {icon, title} = props;

	return (
		<div>
			<div className={styles.header}>
				<img src={icon} />
				<label className={styles.iconLabel}>
					{title}
				</label>
			</div>
			{props.children}
		</div>
	)
}