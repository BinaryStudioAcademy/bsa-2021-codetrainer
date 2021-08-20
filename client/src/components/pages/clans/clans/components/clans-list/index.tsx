import React from 'react';
import ClanItem from '../clan-item';
import { IClansListProps } from './types';
import { WebApi } from 'typings/webapi';
import styles from './clans-list.module.scss';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const tableHeaderItems = [
	'Rank',
	'Avatar',
	'Name',
	'Size',
	'Creation date',
	'Honor',
	'Action',
]

const ClansList: React.FC<IClansListProps> = ({ clans, userId, joinClan, leaveClan }) => {
	return (
		<div className={styles.clansList}>
			<Table >
				<TableHead>
					<TableRow>
						{tableHeaderItems.map(item =>
							<TableCell key={item}>{item}</TableCell>)}
					</TableRow>
				</TableHead>
				<TableBody>
					{clans.map((clan: WebApi.Entities.IClan) => (
						<ClanItem joinClan={joinClan} leaveClan={leaveClan} clan={clan} key={clan.id} userId={userId} />
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ClansList;
