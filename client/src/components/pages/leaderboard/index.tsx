import React, { useMemo } from 'react';
import { ILeaderBoardProps } from './types';
import UserItem from './components/user-item';
import { WebApi } from 'typings/webapi';
import { Button } from 'components';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Spinner } from 'components/common';
import styles from './leaderboard.module.scss';
import SearchLabel from 'components/common/search-label';
import { ButtonClasses } from 'components/basic/button';

const LeaderBoardPage: React.FC<ILeaderBoardProps> = ({
	isLoading,
	users,
	setNameQuery,
	nameQuery,
	page,
	setPage,
	count,
	itemsPerPage,
}) => {
	const showMore = useMemo(() => {
		const itemsLeft = count - (page + 1) * itemsPerPage;
		return itemsLeft > 0;
	}, [page, itemsPerPage, count]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h4>Leaderboard</h4>
			</div>
			<div className={styles.leadersList}>
				<TableContainer>
					<Table className={styles.table}>
						<TableHead>
							<TableRow>
								<TableCell component="th" className={styles.centered}>
									Position
								</TableCell>
								<TableCell component="th">
									<SearchLabel value={nameQuery} onChange={(name) => setNameQuery(name)}>
										User
									</SearchLabel>
								</TableCell>
								<TableCell component="th">Clan</TableCell>
								<TableCell component="th" className={styles.centered}>
									Honor
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user: WebApi.Entities.IUser, index) => (
								<UserItem position={nameQuery ? -1 : index + 1} user={user} key={user.id} />
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
		</div>
	);
};

export default LeaderBoardPage;
