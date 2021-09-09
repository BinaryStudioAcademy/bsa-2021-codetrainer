import React from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@material-ui/core';
import { Rank } from 'components';
import { IClanItemProps } from './types';
import { Avatar } from 'components/basic';
import { ROUTES } from 'constants/routes';
import { getFullDate } from 'helpers/date.helper';
import styles from './clan-item.module.scss';

const ClanItem: React.FC<IClanItemProps> = ({ clan }) => (
	<TableRow className={styles.clanItem}>
		<TableCell className={styles.honor}>{clan.honor}</TableCell>
		<TableCell>
			<Link to={`${ROUTES.Clan}/${clan?.id}`} className={styles.user}>
				<Avatar avatar={clan.avatar} size={50} />
				{clan.name}
				{clan.rank && <Rank rank={clan.rank} />}
			</Link>
		</TableCell>
		<TableCell className={styles.members}>
			<span>
				{clan.numberOfMembers} / {clan.maxMembers}
			</span>
		</TableCell>
		<TableCell className={styles.created}>
			<span>{getFullDate(new Date(clan.createdAt))}</span>
		</TableCell>
	</TableRow>
);

export default ClanItem;
