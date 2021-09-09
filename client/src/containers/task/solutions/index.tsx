import { FullscreenLoader, Spinner } from 'components';
import { SolutionsTab } from 'components/pages/task/tabs/solutionsTab';
import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SolutionStatus } from 'typings/common/solution';
import { IRootState } from 'typings/root-state';
import { WebApi } from 'typings/webapi';
import * as actions from './../logic/actions';

export const Solutions = () => {
	const task = useSelector((state: IRootState) => state.taskInfo.task);
	const user = useSelector((state: IRootState) => state.auth.userData.user);
	const following = useSelector((state: IRootState) => state.taskInfo.following);
	const userSolution = useSelector((state: IRootState) => state.taskInfo.userSolution);
	const isLoading = useSelector((state: IRootState) => state.taskInfo.isLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.getFollowing({ id: user?.id }));
	}, [task]);

	const filterSolutionsByFollowing = useCallback(
		(solutions): WebApi.Entities.ISolution[] => {
			const result: WebApi.Entities.ISolution[] = [];
			following?.forEach((followingUser) => {
				solutions.forEach((solution: WebApi.Entities.ISolution) => {
					if (followingUser.id === solution.user.id) {
						result.push(solution);
					}
				});
			});
			return result;
		},
		[following, task],
	);

	const filterOldest = useCallback(
		(solutions: WebApi.Entities.ISolution[]): WebApi.Entities.ISolution[] => {
			return solutions.sort((a, b) => {
				return Date.parse(String(a.createdAt)) - Date.parse(String(b.createdAt));
			});
		},
		[following, task],
	);

	const filterNewest = useCallback(
		(solutions: WebApi.Entities.ISolution[]): WebApi.Entities.ISolution[] => {
			return solutions.sort((a, b) => {
				return Date.parse(String(b.createdAt)) - Date.parse(String(a.createdAt));
			});
		},
		[following, task],
	);

	const unlockSolution = () => {
		if (!task) {
			return;
		}
		const data = {
			code: task.initialSolution,
			testCases: task.exampleTestCases,
			taskId: task.id,
			solutionId: userSolution.solution?.id,
			status: SolutionStatus.UNLOCKED,
		};

		dispatch(actions.unlockSolution(data));
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (task && user && userSolution) {
		return (
			<SolutionsTab
				task={task}
				filterSolutionsByFollowing={filterSolutionsByFollowing}
				filterNewest={filterNewest}
				filterOldest={filterOldest}
				isLocked={
					(!userSolution.solution ||
						userSolution?.solution?.status === SolutionStatus.SKIPPED ||
						userSolution?.solution?.status === SolutionStatus.NOT_COMPLETED) &&
					task.user?.username !== user.username
				}
				unlockSolutions={unlockSolution}
				solutions={task.solutions.filter((item) => item.status === SolutionStatus.COMPLETED)}
			/>
		);
	}

	return <FullscreenLoader />;
};
