import React, { useState } from 'react';
import ClanItem from '../clan-item';
import { IClansListProps } from './types';
import { WebApi } from 'typings/webapi';
import styles from './clans-list.module.scss';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

import get from 'lodash.get';

export type SortOrder = -1 | 0 | 1;

export function descendingComparator<T>(
	a: T,
	b: T,
	orderBy: keyof T,
): SortOrder {
	if (get(b, orderBy) < get(a, orderBy)) { return -1; }
	if (get(b, orderBy) > get(a, orderBy)) { return 1; }
	return 0;
}

export function getComparator<T>(
	orderBy: keyof T,
	order?: Order,
): (a: T, b: T) => number {
	return order === Order.DESC
		? (a: T, b: T): SortOrder => descendingComparator(a, b, orderBy)
		: (a: T, b: T): SortOrder =>
			-descendingComparator(a, b, orderBy) as SortOrder;
}

export const headCells: Array<{
	id: string;
	label: string;
}> = [
		{ id: 'rank', label: 'Rank' },
		{ id: 'avatar', label: 'Avatar' },
		{ id: 'name', label: 'Name' },
		{ id: 'size', label: 'Size' },
		{ id: 'createdAt', label: 'Creation date' },
		{ id: 'honor', label: 'Honor' },
		{ id: 'action', label: 'Action' },
	];

// const tableHeaderItems = [
// 	'Rank',
// 	'Avatar',
// 	'Name',
// 	'Size',
// 	'Creation date',
// 	'Honor',
// 	'Action',
// ]

// const styles = () => ({
// 	// Fully visible for active icons
// 	activeSortIcon: {
// 		opacity: 1,
// 	},
// 	// Half visible for inactive icons
// 	inactiveSortIcon: {
// 		opacity: 0.4,
// 	},
// });

export enum Order {
	ASC = 'asc',
	DESC = 'desc',
}

const ClansList: React.FC<IClansListProps> = ({ clans, userId, joinClan, leaveClan }) => {
	const [order, setOrder] = useState<Order>(Order.ASC);
	const [orderBy, setOrderBy] = useState<any>('name');

	const handleRequestSort = (property: any): void => {
		const isAsc = orderBy === property && order === Order.ASC;
		setOrder(isAsc ? Order.DESC : Order.ASC);
		setOrderBy(property);
	};

	return (
		<div className={styles.clansList}>
			<Table >
				<TableHead style={{ backgroundColor: 'white' }}>
					{/* <TableRow >
						{tableHeaderItems.map(item =>
							<TableCell align="center" style={{ backgroundColor: 'white' }} key={item}>{item}</TableCell>)}
					</TableRow> */}
					<TableRow>
						{headCells.map(({ id, label }) =>
							id === 'avatar' || id === 'action' || id === 'honor' ? (
								<TableCell component="th" key={id} style={{ backgroundColor: 'white' }}>
									<strong>{label}</strong>
								</TableCell>
							) : (
								<TableCell
									style={{ backgroundColor: 'white' }}
									component="th"
									key={id}
									sortDirection={orderBy === id ? order : false}
								>
									<TableSortLabel
										active={orderBy === id}
										direction={orderBy === id ? order : Order.ASC}
										onClick={(): void => {
											handleRequestSort(id);
										}}
										IconComponent={ArrowDropDown}
									// classes={{
									// 	// Override with the active class if this is the selected column or inactive otherwise
									// 	icon: ((orderBy === .id) ? classes.activeSortIcon : classes.inactiveSortIcon)
									// }}
									>
										<strong>{label}</strong>
									</TableSortLabel>
								</TableCell>
							),
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{clans
						.sort(
							orderBy
								? getComparator(orderBy, order)
								: (): SortOrder => 0,
						)
						.map((clan: WebApi.Entities.IClan) => (
							<ClanItem joinClan={joinClan} leaveClan={leaveClan} clan={clan} key={clan.id} userId={userId} />
						))}
				</TableBody>
				{/* <TableBody>
					{clans.map((clan: WebApi.Entities.IClan) => (
						<ClanItem joinClan={joinClan} leaveClan={leaveClan} clan={clan} key={clan.id} userId={userId} />
					))}
				</TableBody> */}
			</Table>
		</div>
	);
};

export default ClansList;
