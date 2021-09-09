import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

export interface ISideBar {
	sideBar: {
		id: string;
		title: string;
		count?: number;
	}[];
	activeId: string;
	onClick: (key: string) => void;
}

export const SideBar: React.FC<ISideBar> = ({ sideBar, onClick, activeId }) => (
	<div className={styles.profile__tasks__root}>
		{sideBar.map(({ id, title, count = 0 }) => (
			<div
				key={id}
				className={clsx(styles.item, { [styles.active]: id === activeId })}
				onClick={() => onClick(id)}
			>
				<span>
					{title}({count})
				</span>
			</div>
		))}
	</div>
);
