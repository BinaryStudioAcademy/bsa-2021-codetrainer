import React, { useState, useMemo, useCallback, ReactNode } from 'react';
import { ProfileTabWithSidebar } from 'components';
import { getAuthoredCollections, getFollowedCollections, TUserCollectionsLoader } from 'services/collections.service';
import { WebApi } from 'typings/webapi';
import ProfileSkeletonList from 'components/pages/profile/profile-skeleton-list';
import { Collection, CollectionSkeleton } from 'components/common';
import { ReactComponent as CollectionIcon } from 'assets/icons/collection.svg';

enum CollectionsTabValues {
	Authored = 'AUTHORED_COLLECTIONS',
	Followed = 'FOLLOWED_COLLECTIONS',
}

type TCollectionsTab = {
	title: string;
	value: CollectionsTabValues;
	loader: TUserCollectionsLoader;
	empty: ReactNode;
};

function mapItemToCollection({ item }: { item: WebApi.Entities.ICollection }) {
	return <Collection collection={item} />;
}

const collectionsTabs: TCollectionsTab[] = [
	{
		title: 'Authored',
		value: CollectionsTabValues.Authored,
		loader: getAuthoredCollections,
		empty: (
			<div>
				<CollectionIcon width={75} height={75} />
				There are no items to show
			</div>
		),
	},
	{
		title: 'Followed',
		value: CollectionsTabValues.Followed,
		loader: getFollowedCollections,
		empty: (
			<div>
				<CollectionIcon width={75} height={75} />
				You have not started to follow any solutions yet
			</div>
		),
	},
];

export const ProfileCollections: React.FC<{ userId: string }> = ({ userId }) => {
	const [selectedValue, setSelectedValue] = useState<CollectionsTabValues>(collectionsTabs[0].value);
	const [collections, setCollections] = useState<WebApi.Entities.ICollection[] | undefined>(undefined);
	const [full, setFull] = useState<number | undefined>(undefined);
	const [isLoaded, setLoaded] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const { loader, empty } = useMemo(
		() => collectionsTabs.find((tab) => tab.value === selectedValue) as TCollectionsTab,
		[selectedValue],
	);

	const sideBar = useMemo(
		() =>
			collectionsTabs.map((tab) => ({
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
			} catch {
				setHasMore(true);
			}
			setLoaded(false);
		}
	}, [loader, collections, hasMore, isLoaded]);

	const changeTab = useCallback(
		(value: string) => {
			const tab = value as CollectionsTabValues;
			if (tab !== selectedValue) {
				setCollections(undefined);
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
				{...{ items: collections, hasMore, empty }}
				item={mapItemToCollection}
				skeleton={CollectionSkeleton}
				onLoadMore={loadMore}
			/>
		</ProfileTabWithSidebar>
	);
};
