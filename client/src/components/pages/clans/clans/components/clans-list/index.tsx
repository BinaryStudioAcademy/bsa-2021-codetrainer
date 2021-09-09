import React from 'react';
import ClanItem from '../clan-item';
import { IClansListProps } from './types';
import { WebApi } from 'typings/webapi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Order } from 'helpers/table-helper';
import { Spinner } from 'components/common';
import SortLabel from 'components/common/sort-label';
import styles from './clans-list.module.scss';

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
	setOrderBy,
	setOrder,
	setNameQuery,
}) => {
	//const [isNameFieldOpen, setNameFieldOpen] = useState(false);
	//const [searchName, setSearchName] = useState(nameQuery);
	// const [typingTimeout, setTypingTimeout] = useState<null | ReturnType<typeof setTimeout>>(null);

	/*
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setItemsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	*/

	const handleRequestSort = (property: any): void => {
		const isAsc = orderBy === property && order === Order.ASC;
		setOrder(isAsc ? Order.DESC : Order.ASC);
		setOrderBy(property);
	};

	/*
	const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		// setSearchName(query);

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
	*/

	return (
		<div className={styles.clansList}>
			<TableContainer>
				<Table className={styles.table}>
					<TableHead>
						<TableRow>
							<TableCell component="th">
								<SortLabel
									strategy={orderBy}
									setSortingStrategy={handleRequestSort}
									className={styles.centered}
								>
									Honor
								</SortLabel>
							</TableCell>
							<TableCell component="th">
								<SortLabel strategy={orderBy} setSortingStrategy={handleRequestSort}>
									Name
								</SortLabel>
							</TableCell>
							<TableCell component="th">
								<SortLabel
									strategy={orderBy}
									setSortingStrategy={handleRequestSort}
									className={styles.centered}
								>
									Members
								</SortLabel>
							</TableCell>
							<TableCell component="th">
								<SortLabel strategy={orderBy} setSortingStrategy={handleRequestSort}>
									Created
								</SortLabel>
							</TableCell>
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
							clans.map((clan: WebApi.Entities.IClan) => <ClanItem clan={clan} key={clan.id} />)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ClansList;
