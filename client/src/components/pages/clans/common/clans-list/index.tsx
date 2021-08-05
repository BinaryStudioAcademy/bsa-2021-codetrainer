import React from 'react';
import { TClans } from 'containers/clans/logic/state';
import ClanItem from '../clan-item';
import styles from './clans-list.module.scss';

const ClansList: React.FC<{ clans: TClans }> = ({ clans }) => {
	return (
		<table className={styles.clansList}>
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
				{clans.map((clan) => (
					<ClanItem clan={clan} key={clan.id} />
				))}
			</tbody>
		</table>
	);
};

export default ClansList;
