import React from 'react';
import ClansList from './components/clans-list';
import { IClansProps } from '../types';
import styles from './clans.module.scss';
import { Button } from 'components';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';

const ClansPage: React.FC<IClansProps> = ({ isLoading, user, clans, joinClan, leaveClan, setOrderBy, setOrder, handleGoToClan, setNameQuery, nameQuery, order, orderBy, page, setPage, count, itemsPerPage, setItemsPerPage }) => {
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
					joinClan={joinClan}
					isLoading={isLoading}
					leaveClan={leaveClan}
					clans={clans}
					userId={user.id}
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
					setItemsPerPage={setItemsPerPage}
				/>
			</div>
		</>
	);
};

export default ClansPage;
