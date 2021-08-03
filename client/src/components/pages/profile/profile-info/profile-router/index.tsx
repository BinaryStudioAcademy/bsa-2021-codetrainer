import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import styles from './profile-router.module.scss';
import clsx from 'clsx';

export interface IProfileRouterProps {
	tabItems: IMenuItemConfig[];
	activeTabId: string;
}

export interface IMenuItemConfig {
	tabId: string;
	tabNameText: string;
	onClick: () => void;
}

export const ProfileRouter = ({ tabItems, activeTabId }: IProfileRouterProps) => {
	return (
		<Menu className={styles.navMenu}>
			{tabItems.map((tabItem: IMenuItemConfig) => {
				const className = clsx(styles.navMenuItem, {
					[styles.active]: tabItem.tabId === activeTabId,
				});
				return (
					<MenuItem
						key={tabItem.tabId}
						className={className}
						text={tabItem.tabNameText}
						onClick={(e) => {
							if (tabItem.tabId !== activeTabId) {
								tabItem.onClick();
							}
						}}
					/>
				);
			})}
		</Menu>
	);
};
