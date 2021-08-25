import React, { useState, useMemo, useCallback, ReactNode } from 'react';
import { ProfileTabWithSidebar } from 'components';
import { TPrivateSolutionsLoader, getCompletedSolutions, getUncompletedSolutions } from 'services/solutions.service';
import ProfileSkeletonList from 'components/pages/profile/profile-skeleton-list';
import { SolutionStatus } from 'typings/common/solution';
import { TTaskSolutions } from './mocks';
import { TaskSolutions, TaskSolutionsSkeleton } from 'components/common';

type TSolutionTab = {
	title: string;
	value: SolutionStatus;
	loader: TPrivateSolutionsLoader;
	empty: ReactNode;
};

const mapItemToTaskSolutions = ({ item }: { item: TTaskSolutions }) => <TaskSolutions taskSolutions={item} />;

const solutionTabs: TSolutionTab[] = [
	{
		title: 'Completed',
		value: SolutionStatus.COMPLETED,
		loader: getCompletedSolutions,
		empty: 'You have not completed solutions yet',
	},
	{
		title: 'Uncompleted',
		value: SolutionStatus.NOT_COMPLETED,
		loader: getUncompletedSolutions,
		empty: 'You have not uncompleted solutions yet',
	},
];

export const ProfileSolutions: React.FC = () => {
	const [selectedValue, setSelectedValue] = useState<SolutionStatus>(SolutionStatus.COMPLETED);
	const [tasksSolutions, setSolutions] = useState<TTaskSolutions[] | undefined>(undefined);
	const [full, setFull] = useState<number | undefined>(undefined);
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
				count: tab.value === selectedValue ? full : undefined,
			})),
		[selectedValue, full],
	);

	const loadMore = useCallback(async () => {
		if (hasMore && !isLoaded) {
			setLoaded(true);
			try {
				const { items, hasMore, full } = await loader({
					skip: tasksSolutions?.length !== undefined ? tasksSolutions.length : 0,
					limit: 10,
				});
				setHasMore(hasMore);
				setFull(full);
				setSolutions([...(tasksSolutions || []), ...items]);
			} catch {
				setHasMore(true);
			}
			setLoaded(false);
		}
	}, [loader, tasksSolutions, hasMore, isLoaded]);

	const changeTab = useCallback(
		(value: string) => {
			const tab = value as SolutionStatus;
			if (tab !== selectedValue) {
				setSolutions(undefined);
				setFull(undefined);
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
				{...{ items: tasksSolutions, hasMore, empty }}
				item={mapItemToTaskSolutions}
				skeleton={TaskSolutionsSkeleton}
				onLoadMore={loadMore}
			/>
		</ProfileTabWithSidebar>
	);
};
