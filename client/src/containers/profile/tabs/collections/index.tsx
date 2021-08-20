import React, { useState, useMemo, useCallback, ReactNode } from 'react';
import { ProfileTabWithSidebar } from 'components';
import { getAuthoredCollections, getFollowedCollections, TCollectionsLoader } from 'services/collections.service';
import { WebApi } from 'typings/webapi';
import ProfileCollectionsList from 'components/pages/profile/profile-collections-list';

enum CollectionsTabValues {
	Authored = 'AUTHORED_COLLECTIONS',
	Followed = 'FOLLOWED_COLLECTIONS',
}

type TCollectionsTab = {
	title: string;
	value: CollectionsTabValues;
	loader: TCollectionsLoader;
	emptyLabel: ReactNode;
}

const collectionsTabs: TCollectionsTab[] = [
	{
		title: 'Authored',
		value: CollectionsTabValues.Authored,
		loader: getAuthoredCollections,
		emptyLabel: 'There are no items to show',
	},
	{
		title: 'Followed',
		value: CollectionsTabValues.Followed,
		loader: getFollowedCollections,
		emptyLabel: 'You have not started to follow any collections yet'
	},
]

export const ProfileCollections: React.FC<{ userId: string }> = ({ userId }) => {
	const [selectedValue, setSelectedValue] = useState<CollectionsTabValues>(collectionsTabs[0].value);
	const [collections, setCollections] = useState<WebApi.Entities.ICollection[] | undefined>(undefined);
	const [full, setFull] = useState<number | undefined>(undefined);
	const [isLoaded, setLoaded] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const { loader, emptyLabel } = useMemo(
		() => collectionsTabs.find(tab => tab.value === selectedValue) as TCollectionsTab,
		[selectedValue]
	);

	const sideBar = useMemo(
		() => collectionsTabs.map(tab => ({
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
					userId,
					skip: collections?.length !== undefined ? collections.length : 0,
					limit: 10,
				});
				setHasMore(hasMore);
				setFull(full);
				setCollections([...(collections || []), ...items]);
			}
			catch {
				setHasMore(true);
			}
			setLoaded(false);
		}
	}, [loader, collections, hasMore, isLoaded]);

	const changeTab = useCallback((value: string) => {
		const tab = value as CollectionsTabValues;
		if (tab !== selectedValue) {
			setCollections(undefined);
			setFull(undefined);
			setSelectedValue(tab);
			setHasMore(true);
		}
	}, [selectedValue]);

	return (
		<ProfileTabWithSidebar
			sideBar={{
				sideBar,
				activeId: selectedValue,
				onClick: changeTab,
			}}
		>
			<ProfileCollectionsList
				{...{ collections, hasMore, emptyLabel }}
				onLoadMore={loadMore}
			/>
		</ProfileTabWithSidebar>
	);
};
