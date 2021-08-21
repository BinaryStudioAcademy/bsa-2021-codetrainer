import React, { ReactNode } from 'react';
import { FC } from 'react';
import InView from 'react-intersection-observer';
import { WebApi } from 'typings/webapi';
import { Collection } from 'components/common';
import CollectionSkeleton from 'components/common/collection/skeleton';
import styles from './profile-collections-list.module.scss';
import { ReactComponent as CollectionIcon } from 'assets/icons/collection.svg';

interface IProfileCollectionsListProps {
	collections?: WebApi.Entities.ICollection[];
	emptyLabel?: ReactNode;
	hasMore: boolean;
	onLoadMore?: () => void;
}

const ProfileCollectionsList: FC<IProfileCollectionsListProps> = ({
	collections,
	emptyLabel,
	hasMore,
	onLoadMore = () => {}
}) => {
	return (
		<div className={styles.profileCollectionsList}>
			{
				collections?.length !== 0 || hasMore ? (
					<>
					{
						collections?.map(collection => (
							<Collection
								collection={collection}
								key={collection.id}
							/>
						))
					}
					{
						hasMore ? (
							Array(5).fill(null).map((_, index) => (
								index === 0 ? (
									<InView
										onChange={(inView) => {
											if (inView) {
												onLoadMore();
											}
										}}
										key={index}
									>
										<CollectionSkeleton />
									</InView>
								) : (
									<CollectionSkeleton key={index} />
								)
							))
						): null
					}
					</>
				) : (
					<div className={styles.empty}>
						<CollectionIcon className={styles.icon} width={75} height={75} />
						{emptyLabel}
					</div>
				)
			}
		</div>
	);
}

export default ProfileCollectionsList;
