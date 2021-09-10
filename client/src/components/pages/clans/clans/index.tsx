import React from 'react';
import ClansList from './components/clans-list';
import { IClansProps } from '../types';
import styles from './clans.module.scss';
import { Button } from 'components';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';

const ClansPage: React.FC<IClansProps> = ({
	isLoading,
	clans,
	setOrderBy,
	setOrder,
	handleGoToClan,
	setNameQuery,
	nameQuery,
	order,
	orderBy,
	page,
	setPage,
	count,
	itemsPerPage,
}) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<h4>Clans</h4>
					<Button className={clsx(ButtonClasses.blue)} onClick={handleGoToClan}>
						To my clan
					</Button>
				</div>
				<ClansList
					isLoading={isLoading}
					clans={clans}
					setOrderBy={setOrderBy}
					setOrder={setOrder}
					setNameQuery={setNameQuery}
					order={order}
					orderBy={orderBy}
					nameQuery={nameQuery}
					page={page}
					count={count}
					itemsPerPage={itemsPerPage}
					setPage={setPage}
				/>
			</div>
		</>
	);
};

export default ClansPage;
