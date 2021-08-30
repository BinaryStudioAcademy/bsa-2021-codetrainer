import React from 'react';
import { Rank } from 'components';
import { IUserItemProps } from './types';
import { ROUTES } from 'constants/routes';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

const UserItem: React.FC<IUserItemProps> = ({ user, position }) => {

	return (
		<TableRow>
			<TableCell>
				{position}
			</TableCell>
			<TableCell>
				<Rank rank={user.rank ?? 0} />
			</TableCell>
			<TableCell>{user.profileUrl ? <img src={user.profileUrl} /> : <span>No avatar</span>}</TableCell>
			<TableCell><Link to={`${ROUTES.Users}/${user.username}`}>{`${user.name} ${user.surname}`}</Link></TableCell>
			<TableCell>
				<Link to={`${ROUTES.Clan}/${user?.clan?.id}`}>{user?.clan?.name}</Link>
			</TableCell>
			<TableCell>
				<span>{user.honor}</span>
			</TableCell>
		</TableRow>
	);
};

export default UserItem;
