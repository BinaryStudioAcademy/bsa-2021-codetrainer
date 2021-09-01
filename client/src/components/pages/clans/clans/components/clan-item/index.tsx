import React, { MouseEvent } from 'react';
import { Rank } from 'components';
import { IClanItemProps } from './types';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { ROUTES } from 'constants/routes';
import { WebApi } from 'typings/webapi';
import styles from './clan-item.module.scss';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getFullDate } from 'helpers/date.helper';

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

	return (
		<TableRow className={styles.clanRow}>
			<TableCell>
				<Rank rank={clan.rank ?? 0} />
			</TableCell>
			<TableCell>{clan.avatar ? <img src={clan.avatar} /> : <span>No avatar</span>}</TableCell>
			<TableCell>
				<Link to={`${ROUTES.Clan}/${clan?.id}`}>{clan.name}</Link>
			</TableCell>
			<TableCell>
				<span>{clan.numberOfMembers}</span>
			</TableCell>
			<TableCell>
				<span>{getFullDate(clan.createdAt)}</span>
			</TableCell>
			<TableCell>
				<span>{clan.honor}</span>
			</TableCell>
			<TableCell>
				{currentUserMember ? (
					<Button className={ButtonClasses.red} onClick={leaveClanHandler}>
						Leave
					</Button>
				) : (
					<Button className={ButtonClasses.blue} onClick={joinClanHandler}>
						Join
					</Button>
				)}
			</TableCell>
		</TableRow>
	);
};

export default ClanItem;
