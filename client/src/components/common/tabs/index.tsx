import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './tabs.module.scss';

interface ITab {
	name: string;
	content: JSX.Element;
}

interface ITabsProps {
	tabs: Array<ITab>;
}

const Tabs: React.FC<ITabsProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

	const onTabChange = (tab: ITab) => {
		setActiveTab(tab);
	};

	return (
		<div className={styles.tabs}>
			<div className={styles.tabsNavigation}>
				{tabs.map((tab, index) => (
					<span
						className={
							tab.name === activeTab.name
								? clsx(styles.tabsNavigationItem, styles.tabsNavigationItemActive)
								: styles.tabsNavigationItem
						}
						onClick={() => onTabChange(tab)}
						key={index}
					>
						{tab.name}
					</span>
				))}
			</div>
			<div className={styles.tabsContent}>{activeTab.content}</div>
		</div>
	);
};

export default Tabs;
