import React from 'react';
import ClanItem from '../clan-item';
import { IClansListProps } from './types';
import { WebApi } from 'typings/webapi';
import styles from './clans-list.module.scss';

const ClansList: React.FC<IClansListProps> = ({ clans, userId, joinClan, leaveClan }) => {
	return (
		<div className={styles.clansList}>
			<table className={styles.clansListTable}>
				<tbody>
					<tr>
						<td>Rank</td>
						<td>Avatar</td>
						<td>Name</td>
						<td>Size</td>
						<td>Creation date</td>
						<td>Honour</td>
						<td></td>
					</tr>
					{clans.map((clan: WebApi.Entities.IClan) => (
						<ClanItem joinClan={joinClan} leaveClan={leaveClan} clan={clan} key={clan.id} userId={userId} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ClansList;
