import React, { useState } from 'react';
import { ILeaderBoardProps } from './types';
import styles from './clans.module.scss';
import UserItem from './components/user-item';
import { WebApi } from 'typings/webapi';
import {
	ClickAwayListener,
	createStyles,
	IconButton,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import columns from './columns.json';
import { Spinner } from 'components/common';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			marginBottom: '20px',
		},
		table: {
			width: 800,
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
	}),
);

const LeaderBoardPage: React.FC<ILeaderBoardProps> = ({
	isLoading,
	users,
	setNameQuery,
	nameQuery,
	page,
	setPage,
	count,
	itemsPerPage,
	setItemsPerPage,
}) => {

	const [isNameFieldOpen, setNameFieldOpen] = useState(false);
	const [searchName, setSearchName] = useState(nameQuery);
	const [typingTimeout, setTypingTimeout] = useState<null | ReturnType<typeof setTimeout>>(null);

	const classes = useStyles();

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setItemsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchName(query);

		setPage(0);

		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		setTypingTimeout(
			setTimeout(() => {
				setNameQuery(query);
			}, 500),
		);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<h4>Leaderboard</h4>
				</div>
				<Paper className={classes.paper}>
					<TableContainer>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									{columns.map(({ id, label, style }) =>
										id === 'name' ? (
											<TableCell key={id} style={style}>
												<ClickAwayListener
													onClickAway={(): void => {
														setNameFieldOpen(false);
													}}
												>
													<IconButton
														onClick={(): void => {
															setNameFieldOpen(true);
														}}
														style={{ backgroundColor: 'transparent' }}
														disableRipple
														size="small"
													>
														<Search />
														{isNameFieldOpen && (
															<TextField
																value={searchName}
																onChange={handleNameSearchChange}
																type="search"
															/>
														)
														}
													</IconButton>
												</ClickAwayListener>
												{!isNameFieldOpen && <strong>{label}</strong>}
											</TableCell>
										)
											: (
												<TableCell component="th" key={id} style={style}>
													<strong>{label}</strong>
												</TableCell>
											)
									)}
								</TableRow>
							</TableHead>
							<TableBody>
								{isLoading ? (
									<TableRow>
										<TableCell colSpan={7}>
											<Spinner />
										</TableCell>
									</TableRow>
								) : (
									users.map((user: WebApi.Entities.IUser) => (
										<UserItem
											user={user}
											key={user.id}
										/>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={count}
						rowsPerPage={itemsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>

			</div>
		</>
	);
};

export default LeaderBoardPage;
