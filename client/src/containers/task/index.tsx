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
import { FullscreenLoader } from 'components';

export enum ActiveTabId {
	Details = 'Details',
	Solutions = 'Solutions',
	Disclosure = 'Disclosure',
}

export const TaskPageContainer = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const notFound = useSelector((state: IRootState) => state.taskInfo.notFound);
	const task = useSelector((state: IRootState) => state.taskInfo.task);

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

	if (task) {
		const taskProps = {
			id: task.id,
			author: {
				firstName: task.user?.name || '',
				lastName: task.user?.surname || '',
				link: `${ROUTES.Users}/${task.user?.username}`,
			},
			linkToAuthor: `${ROUTES.Users}/${task.user?.username}`,
			title: task.name,
			rank: task.rank,
			stats: {
				favoriteSaves: task.savedToFavorites,
				positiveFeedback: task.positiveFeedback,
			},
			tags: task?.tags?.map((item) => item.name),
		};

		return (
			<Task
				task={taskProps}
				getTabContent={getTabContent}
				tabsRouterProps={{
					tabItems,
					activeTabId,
				}}
			/>
		);
	}

	return <FullscreenLoader />;
};
