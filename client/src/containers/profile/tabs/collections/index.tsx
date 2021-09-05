import React, { useState, useMemo, useCallback, ReactNode, useEffect } from 'react';
import { ProfileTabWithSidebar } from 'components';
import { getAuthoredCollections, getFollowedCollections, TUserCollectionsLoader } from 'services/collections.service';
import { WebApi } from 'typings/webapi';
import ProfileSkeletonList from 'components/pages/profile/profile-skeleton-list';
import { Collection, CollectionSkeleton } from 'components/common';

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
		empty: "User doesn't have any collections yet.",
	},
	{
		title: 'Followed',
		value: CollectionsTabValues.Followed,
		loader: getFollowedCollections,
		empty: "User doesn't follow any collections yet.",
	},
];

export const ProfileCollections: React.FC<{ userId: string }> = ({ userId }) => {
	const [authoredQuantity, setAuthoredQuantity] = useState(0);
	const [followedQuantity, setFollowedQuantity] = useState(0);

	useEffect(() => {
		getAuthoredCollections({ userId, skip: 0, take: 10 }).then(({ collections }) =>
			setAuthoredQuantity(collections.length),
		);
		getFollowedCollections({ userId, skip: 0, take: 10 }).then(({ collections }) =>
			setFollowedQuantity(collections.length),
		);
	}, []);
	const [selectedValue, setSelectedValue] = useState<CollectionsTabValues>(collectionsTabs[0].value);
	const [collections, setCollections] = useState<WebApi.Entities.ICollection[] | undefined>(undefined);
	const [total, setTotal] = useState<number | undefined>(undefined);
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
				count: tab.value === CollectionsTabValues.Authored ? authoredQuantity : followedQuantity,
			})),
		[selectedValue, total],
	);

	const loadMore = useCallback(async () => {
		if (hasMore && !isLoaded) {
			setLoaded(true);
			try {
				const skip = (collections || []).length;
				const { collections: items, total } = await loader({
					userId,
					skip,
					take: 10,
				});
				setHasMore(skip + 10 < (total || 0));
				setTotal(total);
				setCollections([...(collections || []), ...items]);
			} catch (e) {
				console.error(e);
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
				{...{ items: collections, hasMore, empty }}
				item={mapItemToCollection}
				skeleton={CollectionSkeleton}
				onLoadMore={loadMore}
			/>
		</ProfileTabWithSidebar>
	);
};
