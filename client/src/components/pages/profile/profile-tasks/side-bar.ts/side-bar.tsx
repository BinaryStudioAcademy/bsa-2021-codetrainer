import React, { useState } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface ITasksSideBar {
	items: {
		id: string;
		title: string;
		count: number;
	}[];
	onClick: (key: number) => void;
}

export const ProfileTasksSideBar: React.FC<ITasksSideBar> = ({ items, onClick }) => {
	const [activeItem, setActiveItem] = useState<number>(0);
	const handleClick = (id: number) => {
		setActiveItem(id);
		onClick(id);
	};
	return (
		<div className={styles.profile__tasks__root}>
			{items.map(({ id, title, count }, index) => (
				<div
					key={id}
					className={clsx(styles.item, index === activeItem ? styles.active : '')}
					onClick={() => handleClick(index)}
				>
					<span>{title}</span> (<span>{count}</span>)
				</div>
			))}
		</div>
	);
};
