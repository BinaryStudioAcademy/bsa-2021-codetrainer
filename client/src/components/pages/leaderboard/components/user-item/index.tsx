import React from 'react';
import { Rank } from 'components';
import { IUserItemProps } from './types';
import { ROUTES } from 'constants/routes';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './user-item.module.scss';
import { Avatar } from 'components/basic';

const UserItem: React.FC<IUserItemProps> = ({ user, position }) => {
	return (
		<TableRow className={styles.userItem}>
			<TableCell className={styles.position}>{position > 0 ? position : ''}</TableCell>
			<TableCell>
				<Link to={`${ROUTES.Users}/${user.username}`} className={styles.user}>
					<Avatar avatar={user.avatar} size={50} />
					{`${user.name} ${user.surname}`}
					{user.rank && <Rank rank={user.rank} />}
				</Link>
			</TableCell>
			<TableCell className={styles.clan}>
				<Link to={`${ROUTES.Clan}/${user?.clan?.id}`}>{user?.clan?.name}</Link>
			</TableCell>
			<TableCell className={styles.honor}>
				<span>{user.honor}</span>
			</TableCell>
		</TableRow>
	);
};

export default UserItem;
