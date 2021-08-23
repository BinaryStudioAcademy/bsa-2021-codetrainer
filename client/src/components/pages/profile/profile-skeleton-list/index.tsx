import React, { ReactNode, FC } from 'react';
import InView from 'react-intersection-observer';
import styles from './profile-skeleton-list.module.scss';

interface IProfileSkeletonListProps<I> {
	items?: I[];
	empty?: ReactNode;
	hasMore: boolean;
	onLoadMore?: () => void;
	item: FC<{ item: I }>;
	skeleton: FC;
}

export default function ProfileSkeletonList<I>({
	items,
	empty,
	hasMore,
	onLoadMore = () => {},
	item: Item,
	skeleton: Skeleton,
}: IProfileSkeletonListProps<I>) {
	return (
		<div className={styles.profileSkeletonList}>
			{items?.length !== 0 || hasMore ? (
				<>
					{items?.map((item, index) => (
						<Item item={item} key={index} />
					))}
					{hasMore
						? Array(5)
								.fill(null)
								.map((_, index) =>
									index === 0 ? (
										<InView
											onChange={(inView) => {
												if (inView) {
													onLoadMore();
												}
											}}
											key={index}
										>
											<Skeleton />
										</InView>
									) : (
										<Skeleton key={index} />
									),
								)
						: null}
				</>
			) : (
				<div className={styles.empty}>{empty}</div>
			)}
		</div>
	);
}
