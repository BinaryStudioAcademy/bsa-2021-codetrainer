import { Task } from 'components/pages/task';
import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { ITabItem } from 'components/pages/task/tabs-router';
import { Details } from './details';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as actions from './logic/actions';
import { IRootState } from 'typings/root-state';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

export enum ActiveTabId {
	Details = 'Details',
	Solutions = 'Solutions',
	Disclosure = 'Disclosure',
}

export const TaskPageContainer = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const notFound = useSelector((state: IRootState) => state.task.notFound);

	useEffect(() => {
		dispatch(actions.getTask({ id }));
	}, []);

	const [activeTabId, setActiveTabId] = useState(ActiveTabId.Details);

	const setActiveTab = useCallback((tabId: ActiveTabId) => {
		setActiveTabId(tabId);
	}, []);

	const getTabContent = useCallback((): React.ReactNode => {
		switch (activeTabId) {
			case ActiveTabId.Details: {
				return <Details />;
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

	if (notFound) {
		return <Redirect to={ROUTES.NotFound} />;
	}

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
