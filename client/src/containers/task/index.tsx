import React, { useMemo, useCallback, useEffect } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from 'components/pages/task';
import { IRootState } from 'typings/root-state';
import { ROUTES, TASK_ROUTES } from 'constants/routes';
import { FullscreenLoader } from 'components';
import { mapDataToChallenges } from 'helpers/maps';
import { Details } from './details';
import * as actions from './logic/actions';
import historyHelper from 'helpers/history.helper';
import { Solutions } from './solutions';
import { SolutionStatus } from 'typings/common/solution';

export const Tabs: Record<string, { id: number; name: string }> = {
	details: { id: 0, name: 'Details' },
	solutions: { id: 1, name: 'Solutions' },
	discourse: { id: 2, name: 'Discourse' },
};

export const TaskPageContainer = () => {
	const params = useParams<{ id: string; tab: string }>();
	const { notFound, task, nextTaskId } = useSelector((state: IRootState) => state.taskInfo);
	const user = useSelector((state: IRootState) => state.auth.userData.user);
	const userSolution = useSelector((state: IRootState) => state.taskInfo.userSolution);
	const history = useHistory();
	const dispatch = useDispatch();

	const activeTabId = useMemo(() => Tabs[params.tab]?.id || Tabs.details.id, [params.tab]);

	useEffect(() => {
		if (nextTaskId) {
			historyHelper.push(`${ROUTES.TaskInfo}/${nextTaskId}`);
		}
	}, [nextTaskId]);

	useEffect(() => {
		dispatch(actions.getTask({ id: params.id }));
	}, [params.id]);

	useEffect(() => {
		dispatch(actions.getUserSolution({ taskId: task?.id }));
	}, [task, user]);

	const handleTabChange = useCallback(
		(tabId: number) => {
			const tabName = Object.values(Tabs).find(({ id }) => id === tabId);
			if (!task || !tabName) {
				return;
			}
			const tab = tabId === 0 ? '' : TASK_ROUTES[tabName.name];
			history.push(`${ROUTES.TaskInfo}/${task.id}${tab}`);
		},
		[task],
	);

	const getTabContent = useCallback((): React.ReactNode => {
		switch (activeTabId) {
			case Tabs.details.id: {
				return <Details />;
			}
			case Tabs.solutions.id: {
				return <Solutions />;
			}
			default: {
				return <div>{activeTabId}</div>;
			}
		}
	}, [activeTabId]);

	const handleSkipClick = () => {
		if (task) {
			const data = {
				code: task.initialSolution,
				testCases: task.exampleTestCases,
				taskId: task.id,
				solutionId: userSolution.solution?.id,
				status: SolutionStatus.SKIPPED,
			};
			dispatch(actions.getNextTask(data));
		}
	};

	if (notFound) {
		return <Redirect to={ROUTES.NotFound} />;
	}

	if (task) {
		const taskProps = mapDataToChallenges(task);
		return (
			<Task
				handleSkipClick={handleSkipClick}
				task={taskProps}
				getTabContent={getTabContent}
				tabsRouterProps={{
					tabItems: Object.values(Tabs),
					activeTabId,
					onChange: handleTabChange,
				}}
			/>
		);
	}

	return <FullscreenLoader />;
};
