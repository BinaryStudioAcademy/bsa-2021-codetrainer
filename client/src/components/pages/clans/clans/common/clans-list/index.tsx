import React from 'react';
import { TClans } from 'containers/clans/types';
import ClanItem from '../clan-item';
import styles from './clans-list.module.scss';

const ClansList: React.FC<{ clans: TClans }> = ({ clans }) => {
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
						<td>Honor</td>
						<td></td>
					</tr>
					{clans.map((clan) => (
						<ClanItem clan={clan} key={clan.id} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ClansList;
