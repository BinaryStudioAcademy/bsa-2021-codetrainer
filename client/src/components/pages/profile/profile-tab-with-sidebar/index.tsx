import React from 'react';
import { SideBar, ISideBar } from './side-bar';

import styles from './styles.module.scss';

interface IProfileTabWithSidebar{
	sideBar: ISideBar;
	children: React.ReactNode;
}

export const ProfileTabWithSidebar: React.FC<IProfileTabWithSidebar> = ({ sideBar, children }) => (
	<div className={styles.root}>
		<SideBar {...sideBar} />
		{children}
	</div>
);
