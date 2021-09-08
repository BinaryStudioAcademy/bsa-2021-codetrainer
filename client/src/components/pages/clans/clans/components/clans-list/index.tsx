import React, { useState } from 'react';
import ClanItem from '../clan-item';
import { IClansListProps } from './types';
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
	TableSortLabel,
	TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Order } from 'helpers/table-helper';
import columns from './columns.json';
import { Spinner } from 'components/common';
import styles from './clans-list.module.scss';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			background: 'var(--container-color)',
			marginBottom: '20px',
		},
		table: {
			width: 800,
			color: 'red',
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

const ClansList: React.FC<IClansListProps> = ({
	clans,
	count,
	isLoading,
	userId,
	order,
	orderBy,
	nameQuery,
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage,
	joinClan,
	leaveClan,
	setOrderBy,
	setOrder,
	setNameQuery,
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

	const handleRequestSort = (property: any): void => {
		const isAsc = orderBy === property && order === Order.ASC;
		setOrder(isAsc ? Order.DESC : Order.ASC);
		setOrderBy(property);
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
		<Paper className={classes.paper}>
			<TableContainer>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							{columns.map(({ id, label, isSortable, style }) =>
								!isSortable ? (
									<TableCell component="th" key={id} style={style}>
										<strong className={styles.columnName}>{label}</strong>
									</TableCell>
								) : (
									<TableCell
										component="th"
										style={style}
										key={id}
										className={styles.columnName}
										sortDirection={orderBy === id ? order : false}
									>
										{id === 'name' && (
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
															className={styles.columnName}
															value={searchName}
															onChange={handleNameSearchChange}
															type="search"
														/>
													)}
												</IconButton>
											</ClickAwayListener>
										)}
										{id === 'name' && isNameFieldOpen ? null : (
											<TableSortLabel
												active={orderBy === id}
												direction={orderBy === id ? order : Order.ASC}
												onClick={(): void => {
													handleRequestSort(id);
												}}
											>
												{id === 'name' && isNameFieldOpen ? null : <strong>{label}</strong>}
												{orderBy === id ? (
													<span className={classes.visuallyHidden}>
														{order === Order.DESC
															? 'sorted descending'
															: 'sorted ascending'}
													</span>
												) : null}
											</TableSortLabel>
										)}
									</TableCell>
								),
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
							clans.map((clan: WebApi.Entities.IClan) => (
								<ClanItem
									joinClan={joinClan}
									leaveClan={leaveClan}
									clan={clan}
									key={clan.id}
									userId={userId}
								/>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				className={styles.pagesPanel}
				count={count}
				rowsPerPage={itemsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default ClansList;
