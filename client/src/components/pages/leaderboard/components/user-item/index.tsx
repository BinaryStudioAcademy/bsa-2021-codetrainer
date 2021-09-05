import React from 'react';
import { Rank } from 'components';
import { IUserItemProps } from './types';
import { ROUTES } from 'constants/routes';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Avatar } from 'components/basic';

const UserItem: React.FC<IUserItemProps> = ({ user, position }) => {
	const StyledTableCell = withStyles(() =>
		createStyles({
			head: {
				backgroundColor: 'var(--pink)',
			},
			body: {
				color: 'var(--text-color)',
				fontSize: 14,
			},
		}),
	)(TableCell);

	const StyledTableRow = withStyles(() =>
		createStyles({
			root: {
				backgroundColor: 'var(--container-color)',
			},
		}),
	)(TableRow);

	return (
		<StyledTableRow>
			<StyledTableCell>{position}</StyledTableCell>
			<StyledTableCell>
				<Rank rank={user.rank ?? 0} />
			</StyledTableCell>
			<StyledTableCell>{user.avatar ? <Avatar avatar={user.avatar} /> : <span>No avatar</span>}</StyledTableCell>
			<StyledTableCell>
				<Link to={`${ROUTES.Users}/${user.username}`}>{`${user.name} ${user.surname}`}</Link>
			</StyledTableCell>
			<StyledTableCell>
				<Link to={`${ROUTES.Clan}/${user?.clan?.id}`}>{user?.clan?.name}</Link>
			</StyledTableCell>
			<StyledTableCell>
				<span>{user.honor}</span>
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default UserItem;
