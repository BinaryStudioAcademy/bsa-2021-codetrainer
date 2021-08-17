import React from 'react';
import styles from './clan-item.module.scss';
import { Rank } from 'components';
import { IClan } from 'containers/clans/types';
import { Button } from 'components/basic';

const ClanItem: React.FC<{ clan: IClan }> = ({ clan }) => {
	return (
		<tr className={styles.clanItem}>
			<td>
				<Rank rank={clan.rank} />
			</td>
			<td>
				{clan.avatar ? <img className={styles.clanItemAvatar} src={clan.avatar} /> : <span>No avatar</span>}
			</td>
			<td>
				<span className={styles.clanItemName}>{clan.name}</span>
			</td>
			<td>
				<span className={styles.clanItemSize}>{clan.maxMembers}</span>
			</td>
			<td>
				<span className={styles.clanItemCreationDate}>
					{clan.createdAt.toLocaleString('en-us', { month: 'long' })} {clan.createdAt.getFullYear()}
				</span>
			</td>
			<td>
				<span className={styles.clanItemHonor}>{clan.honor}</span>
			</td>
			<td>
				<Button>Join</Button>
			</td>
		</tr>
	);
};

export default ClanItem;
