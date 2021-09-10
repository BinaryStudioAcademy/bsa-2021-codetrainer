import React, { useCallback, PropsWithChildren } from 'react';
import { TableSortLabel } from '@material-ui/core';
import clsx from 'clsx';
import { ISortLabelProps } from './types';
import { Order } from 'helpers/table-helper';
import styles from './sort-label.module.scss';

function SortLabel<I>({
	current,
	strategy,
	setSortingStrategy,
	defaultOrder = Order.ASC,
	children,
	className,
}: PropsWithChildren<ISortLabelProps<I>>) {
	const toggleSort = useCallback(() => {
		if (current?.strategy === strategy) {
			setSortingStrategy({
				strategy,
				order: current?.order === Order.ASC ? Order.DESC : Order.ASC,
			});
		} else {
			setSortingStrategy({
				strategy,
				order: defaultOrder,
			});
		}
	}, [current, strategy, setSortingStrategy, defaultOrder]);

	return (
		<TableSortLabel
			active={current?.strategy === strategy}
			direction={current?.strategy === strategy ? current?.order : defaultOrder}
			onClick={toggleSort}
			className={clsx(styles.sortLabel, className)}
		>
			{children}
		</TableSortLabel>
	);
}

export default SortLabel;
