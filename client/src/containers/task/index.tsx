import { Task } from 'components/pages/task';
import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { DetailsTab } from 'components/pages/task/tabs/detailsTab';
import { ITabItem } from 'components/pages/task/tabs-router';

export enum ActiveTabId {
	Details = 'Details',
	Solutions = 'Solutions',
	Disclosure = 'Disclosure',
}

export const TaskPageContainer = () => {
	const [activeTabId, setActiveTabId] = useState(ActiveTabId.Details);

	const setActiveTab = useCallback((tabId: ActiveTabId) => {
		setActiveTabId(tabId);
	}, []);

	const getTabContent = useCallback((): React.ReactNode => {
		switch (activeTabId) {
			case ActiveTabId.Details: {
				return <DetailsTab />;
			}
			default: {
				return <div>{activeTabId}</div>;
			}
		}
	}, [activeTabId]);

	const tabItems = useMemo(() => {
		return Object.values(ActiveTabId).map((item) => {
			return {
				tab: item,
				onClick: () => {
					setActiveTab(item);
				},
			} as ITabItem;
		});
	}, [setActiveTab]);

	return (
		<Task
			getTabContent={getTabContent}
			tabsRouterProps={{
				tabItems,
				activeTabId,
			}}
		/>
	);
};
