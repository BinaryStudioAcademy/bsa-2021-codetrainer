import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './tabs.module.scss';

interface ITab {
	name: string;
	content: JSX.Element;
}

interface ITabsProps {
	tabs: Array<ITab>;
	activeTabIndex?: number;
	onChange?: (tab: number) => void;
}

const Tabs: React.FC<ITabsProps> = ({ tabs, onChange, activeTabIndex }) => {
	const [activeTab, setActiveTab] = useState<number>(activeTabIndex || 0);

	const onTabChange = (tab: number) => {
		setActiveTab(tab);
		if (onChange) {
			onChange(tab);
		}
	};

	return (
		<div className={styles.tabs}>
			<div className={styles.tabsNavigation}>
				{tabs.map((tab, index) => (
					<span
						className={
							index === activeTab
								? clsx(styles.tabsNavigationItem, styles.tabsNavigationItemActive)
								: styles.tabsNavigationItem
						}
						onClick={() => onTabChange(index)}
						key={index}
					>
						{tab.name}
					</span>
				))}
			</div>
			<div className={styles.tabsContent}>{tabs[activeTab].content}</div>
		</div>
	);
};

export default Tabs;
