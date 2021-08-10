import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

export interface ITasksSideBar {
	sideBar: {
		id: string;
		title: string;
		count: number;
	}[];
	activeId: string;
	onClick: (key: string) => void;
}

export const ProfileTasksSideBar: React.FC<ITasksSideBar> = ({ sideBar, onClick, activeId }) => (
	<div className={styles.profile__tasks__root}>
		{sideBar.map(({ id, title, count }) => (
			<div
				key={id}
				className={clsx(styles.item, { [styles.active]: id === activeId })}
				onClick={() => onClick(id)}
			>
				<span>{title}</span> (<span>{count}</span>)
			</div>
		))}
	</div>
);
