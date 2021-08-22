import React, { MouseEvent } from 'react';
import { Rank } from 'components';
import { IClanItemProps } from './types';
import { Button } from 'components/basic';
import { MemberRoles } from 'common/enum/app/clans';
import { ButtonClasses } from 'components/basic/button';
import { getMonthName } from 'helpers/date';
import { ROUTES } from 'constants/routes';
import { WebApi } from 'typings/webapi';
import styles from './clan-item.module.scss';
import { TableCell, TableRow } from '@material-ui/core';
import historyHelper from 'helpers/history.helper';

const ClanItem: React.FC<IClanItemProps> = ({ clan, userId, joinClan, leaveClan }) => {
	const currentUserMember = clan.members.find((member: WebApi.Entities.IMember) => member.id === userId);

	const goToClanHandler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		historyHelper.push(`${ROUTES.Clan}/${clan?.id}`)

	};

	const leaveClanHandler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		leaveClan(clan.id);
	};

	const joinClanHandler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		joinClan(clan.id);
	};

	return (
		<TableRow onClick={goToClanHandler} className={styles.clanRow}>
			<TableCell>
				<Rank rank={clan.rank ?? 0} />
			</TableCell>
			<TableCell>{clan.avatar ? <img src={clan.avatar} /> : <span>No avatar</span>}</TableCell>
			<TableCell>
				<span>{clan.name}</span>
			</TableCell>
			<TableCell>
				<span>{clan.members.length}</span>
			</TableCell>
			<TableCell>
				<span>
					{getMonthName(clan.createdAt)} {clan.createdAt.getFullYear()}
				</span>
			</TableCell>
			<TableCell>
				<span>{clan.honor}</span>
			</TableCell>
			<TableCell>
				{currentUserMember ? (
					currentUserMember.profileClan?.role !== MemberRoles.ADMIN ? (
						<Button className={ButtonClasses.red} onClick={leaveClanHandler}>
							Leave
						</Button>
					) : null
				) : (
					<Button className={ButtonClasses.blue} onClick={joinClanHandler}>Join</Button>
				)}
			</TableCell>
		</TableRow>
	);
};

export default ClanItem;
