import React, { useState, useMemo, useCallback, ReactNode } from 'react';
import { ProfileTabWithSidebar } from 'components';
import { TTaskSolutionsLoader, getCompletedSolutions, getUncompletedSolutions } from 'services/solutions.service';
import ProfileSkeletonList from 'components/pages/profile/profile-skeleton-list';
import { SolutionStatus } from 'typings/common/solution';
import { TaskSolutions, TaskSolutionsSkeleton } from 'components/common';
import { WebApi } from 'typings/webapi';

type TSolutionTab = {
	title: string;
	value: SolutionStatus;
	loader: TTaskSolutionsLoader;
	empty: ReactNode;
};

const mapItemToTaskSolutions = ({ item }: { item: WebApi.Entities.ITask }) => <TaskSolutions task={item} />;

const solutionTabs: TSolutionTab[] = [
	{
		title: 'Completed',
		value: SolutionStatus.COMPLETED,
		loader: getCompletedSolutions,
		empty: "User doesn't have completed solutions yet.",
	},
	{
		title: 'Uncompleted',
		value: SolutionStatus.NOT_COMPLETED,
		loader: getUncompletedSolutions,
		empty: "User doesn't have uncompleted solutions yet.",
	},
];

export const ProfileSolutions: React.FC = () => {
	const [selectedValue, setSelectedValue] = useState<SolutionStatus>(SolutionStatus.COMPLETED);
	const [tasks, setTasks] = useState<WebApi.Entities.ITask[] | undefined>(undefined);
	const [total, setTotal] = useState<number | undefined>(undefined);
	const [isLoaded, setLoaded] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const { loader, empty } = useMemo(
		() => solutionTabs.find((tab) => tab.value === selectedValue) as TSolutionTab,
		[selectedValue],
	);

	const sideBar = useMemo(
		() =>
			solutionTabs.map((tab) => ({
				...tab,
				id: tab.value,
				count: tab.value === selectedValue ? total : undefined,
			})),
		[selectedValue, total],
	);

	const loadMore = useCallback(async () => {
		if (hasMore && !isLoaded) {
			setLoaded(true);
			try {
				const skip = tasks?.length !== undefined ? tasks.length : 0;
				const { tasks: items, total } = await loader({
					skip,
					take: 10,
				});
				setHasMore(skip + 10 < total);
				setTotal(total);
				setTasks([...(tasks || []), ...items]);
			} catch {
				setHasMore(true);
			}
			setLoaded(false);
		}
	}, [loader, tasks, hasMore, isLoaded]);

	const changeTab = useCallback(
		(value: string) => {
			const tab = value as SolutionStatus;
			if (tab !== selectedValue) {
				setTasks(undefined);
				setTotal(undefined);
				setSelectedValue(tab);
				setHasMore(true);
			}
		},
		[selectedValue],
	);

	return (
		<ProfileTabWithSidebar
			sideBar={{
				sideBar,
				activeId: selectedValue,
				onClick: changeTab,
			}}
		>
			<ProfileSkeletonList
				{...{ items: tasks, hasMore, empty }}
				item={mapItemToTaskSolutions}
				skeleton={TaskSolutionsSkeleton}
				onLoadMore={loadMore}
			/>
		</ProfileTabWithSidebar>
	);
};
