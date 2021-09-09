import React, { useState, useMemo, useCallback, ReactNode } from 'react';
import { ProfileTabWithSidebar } from 'components';
import { getUserSolutions } from 'services/solutions.service';
import ProfileSkeletonList from 'components/pages/profile/profile-skeleton-list';
import { SolutionStatus } from 'typings/common/solution';
import { TaskSolutions, TaskSolutionsSkeleton } from 'components/common';
import { WebApi } from 'typings/webapi';

type TSolutionTab = {
	title: string;
	value: SolutionStatus;
	empty: ReactNode;
};

const mapItemToTaskSolutions = ({ item }: { item: WebApi.Entities.ITask }) => <TaskSolutions task={item} />;

const solutionTabs: TSolutionTab[] = [
	{
		title: 'Completed',
		value: SolutionStatus.COMPLETED,
		empty: "User doesn't have completed solutions yet.",
	},
	{
		title: 'Uncompleted',
		value: SolutionStatus.NOT_COMPLETED,
		empty: "User doesn't have uncompleted solutions yet.",
	},
	{
		title: 'Skipped',
		value: SolutionStatus.SKIPPED,
		empty: "User doesn't have skipped solutions yet.",
	},
	{
		title: 'Unlocked',
		value: SolutionStatus.UNLOCKED,
		empty: "User doesn't have unlocked solutions yet.",
	},
];

export const ProfileSolutions: React.FC = () => {
	const [selectedValue, setSelectedValue] = useState<SolutionStatus>(SolutionStatus.COMPLETED);
	const [tasks, setTasks] = useState<WebApi.Entities.ITask[]>([]);
	const [solutionsCount, setSolutionsCount] = useState<{ [key in SolutionStatus]?: string }>({});
	const [isLoaded, setLoaded] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const { empty } = useMemo(
		() => solutionTabs.find((tab) => tab.value === selectedValue) as TSolutionTab,
		[selectedValue],
	);

	const sideBar = useMemo(
		() =>
			solutionTabs.map((tab) => ({
				...tab,
				id: tab.value,
				count: Number(solutionsCount?.[tab.value] ?? 0),
			})),
		[solutionsCount],
	);

	const loadMore = useCallback(async () => {
		if (hasMore && !isLoaded) {
			setLoaded(true);
			try {
				const skip = tasks?.length !== undefined ? tasks.length : 0;
				const { tasks: items, count } = await getUserSolutions({
					skip,
					take: 10,
					status: selectedValue,
				});
				setSolutionsCount(count || {});
				setHasMore(skip + 10 < Number(count?.[selectedValue] ?? 0));
				setTasks([...(tasks || []), ...items]);
			} catch {
				setHasMore(Boolean(solutionsCount?.[selectedValue]));
			}
			setLoaded(false);
		}
	}, [tasks, hasMore, isLoaded]);

	const changeTab = useCallback(
		(value: string) => {
			const tab = value as SolutionStatus;
			if (tab !== selectedValue) {
				setTasks([]);
				setSelectedValue(tab);
				setHasMore(Boolean(solutionsCount?.[tab]));
			}
		},
		[selectedValue, solutionsCount],
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
