import React from 'react';
import { Rank } from 'components';
import { IMemberItemProps } from './types';
import { getFullDate } from 'helpers/date.helper';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import { Avatar } from 'components/basic';
import { TableCell, TableRow } from '@material-ui/core';
import styles from './member-item.module.scss';

const MemberItem: React.FC<IMemberItemProps> = ({ member }) => {
	return (
		<TableRow className={styles.memberItem}>
			<TableCell className={styles.position}>
				{member.position}
			</TableCell>
			<TableCell>
				<Link
					to={`${ROUTES.Users}/${member.username}`}
					className={styles.user}
				>
					<Avatar avatar={member.avatar} size={50} />
					{member.name} {member.surname}
					<Rank rank={member.rank} />
				</Link>
			</TableCell>
			<TableCell className={styles.join}>
				{getFullDate(new Date(member.profileClan.joinedAt))}
			</TableCell>
			<TableCell className={styles.honor}>
				{member.honor}
			</TableCell>
		</TableRow>
	);
};

export default MemberItem;
