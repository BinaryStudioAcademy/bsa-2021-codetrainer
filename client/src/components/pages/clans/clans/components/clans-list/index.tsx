import React, { useMemo } from 'react';
import ClanItem from '../clan-item';
import { IClansListProps } from './types';
import { WebApi } from 'typings/webapi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Spinner } from 'components/common';
import SortLabel from 'components/common/sort-label';
import styles from './clans-list.module.scss';
import { ClansOrderByOptions } from 'containers/clans/clans/logic/state';
import { ButtonClasses } from 'components/basic/button';
import { Button } from 'components';
import SearchLabel from 'components/common/search-label';

const ClansList: React.FC<IClansListProps> = ({
	clans,
	count,
	isLoading,
	order,
	orderBy,
	nameQuery,
	page,
	itemsPerPage,
	setPage,
	setOrderBy,
	setOrder,
	setNameQuery,
}) => {
	const handleRequestSort = ({ order, strategy }: any): void => {
		setOrder(order);
		setOrderBy(strategy);
	};

	const showMore = useMemo(() => {
		const itemsLeft = count - (page + 1) * itemsPerPage;
		return itemsLeft > 0;
	}, [page, itemsPerPage, count]);

	return (
		<>
			<div className={styles.clansList}>
				<TableContainer>
					<Table className={styles.table}>
						<TableHead>
							<TableRow>
								<TableCell component="th">
									<SortLabel
										strategy={ClansOrderByOptions.BY_HONOR}
										setSortingStrategy={handleRequestSort}
										className={styles.centered}
										current={{
											order,
											strategy: orderBy,
										}}
									>
										Honor
									</SortLabel>
								</TableCell>
								<TableCell component="th">
									<SortLabel
										strategy={ClansOrderByOptions.BY_NAME}
										setSortingStrategy={handleRequestSort}
										current={{
											order,
											strategy: orderBy,
										}}
									>
										<SearchLabel value={nameQuery} onChange={(name) => setNameQuery(name)}>
											Name
										</SearchLabel>
									</SortLabel>
								</TableCell>
								<TableCell component="th">
									<SortLabel
										strategy={ClansOrderByOptions.BY_SIZE}
										setSortingStrategy={handleRequestSort}
										className={styles.centered}
										current={{
											order,
											strategy: orderBy,
										}}
									>
										Members
									</SortLabel>
								</TableCell>
								<TableCell component="th">
									<SortLabel
										strategy={ClansOrderByOptions.BY_TIME}
										current={{
											order,
											strategy: orderBy,
										}}
										setSortingStrategy={handleRequestSort}
									>
										Created
									</SortLabel>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clans.map((clan: WebApi.Entities.IClan) => (
								<ClanItem clan={clan} key={clan.id} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{isLoading && <Spinner />}
			{!isLoading && showMore && (
				<div className={styles.buttonWrapper}>
					<Button
						className={ButtonClasses.red}
						onClick={() => {
							setPage(page + 1);
						}}
						disabled={isLoading}
					>
						Load More
					</Button>
				</div>
			)}
		</>
	);
};

export default ClansList;
