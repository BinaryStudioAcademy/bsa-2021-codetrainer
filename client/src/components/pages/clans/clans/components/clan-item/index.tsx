import React, { MouseEvent } from 'react';
import { Rank } from 'components';
import { IClanItemProps } from './types';
import { Avatar, Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { ROUTES } from 'constants/routes';
import { WebApi } from 'typings/webapi';
import styles from './clan-item.module.scss';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getFullDate } from 'helpers/date.helper';
import { withStyles, createStyles } from '@material-ui/core/styles';

const ClanItem: React.FC<IClanItemProps> = ({ clan, userId, joinClan, leaveClan }) => {
	const currentUserMember = clan.members.find((member: WebApi.Entities.IMember) => member.id === userId);

	const leaveClanHandler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		leaveClan(clan.id);
	};

	const joinClanHandler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		joinClan(clan.id);
	};

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
		<StyledTableRow className={styles.clanRow}>
			<StyledTableCell>
				<Rank rank={clan.rank ?? 0} />
			</StyledTableCell>
			<StyledTableCell>
				<Avatar avatar={clan.avatar} size={40} />
			</StyledTableCell>
			<StyledTableCell>
				<Link to={`${ROUTES.Clan}/${clan?.id}`}>{clan.name}</Link>
			</StyledTableCell>
			<StyledTableCell>
				<span>{clan.numberOfMembers}</span>
			</StyledTableCell>
			<StyledTableCell>
				<span>{getFullDate(new Date(clan.createdAt))}</span>
			</StyledTableCell>
			<StyledTableCell>
				<span>{clan.honor}</span>
			</StyledTableCell>
			<StyledTableCell>
				{currentUserMember ? (
					<Button className={ButtonClasses.red} onClick={leaveClanHandler}>
						Leave
					</Button>
				) : (
					<Button className={ButtonClasses.blue} onClick={joinClanHandler}>
						Join
					</Button>
				)}
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default ClanItem;
