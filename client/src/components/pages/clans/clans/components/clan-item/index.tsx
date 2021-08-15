import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router';
import { Rank } from 'components';
import { IClanItemProps } from './types';
import { Button } from 'components/basic';
import { MemberRoles } from 'common/enum/app/clans';
import { ButtonClasses } from 'components/basic/button';
import { getMonthName } from 'helpers/date';
import { ROUTES } from 'constants/routes';
import { WebApi } from 'typings/webapi';
import styles from './clan-item.module.scss';

const ClanItem: React.FC<IClanItemProps> = ({ clan, userId, joinClan, leaveClan }) => {
	const history = useHistory();
	const currentUserMember = clan.members.find((member: WebApi.Entities.IMember) => member.id === userId);

	const goToClanHanler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();

		if (currentUserMember) {
			history.push(ROUTES.Clan);
		}
	};

	const leaveClanHanler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		leaveClan(clan.id);
	};

	const joinClanHanler = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		joinClan(clan.id);
	};

	return (
		<tr onClick={goToClanHanler} className={currentUserMember && styles.clanJoined}>
			<td>
				<Rank rank={clan.rank} />
			</td>
			<td>{clan.avatar ? <img src={clan.avatar} /> : <span>No avatar</span>}</td>
			<td>
				<span>{clan.name}</span>
			</td>
			<td>
				<span>{clan.maxMembers}</span>
			</td>
			<td>
				<span>
					{getMonthName(clan.createdAt)} {clan.createdAt.getFullYear()}
				</span>
			</td>
			<td>
				<span>{clan.honour}</span>
			</td>
			<td>
				{currentUserMember ? (
					currentUserMember.profileClan?.role !== MemberRoles.ADMIN ? (
						<Button className={ButtonClasses.red} onClick={leaveClanHanler}>
							Leave
						</Button>
					) : null
				) : (
					<Button onClick={joinClanHanler}>Join</Button>
				)}
			</td>
		</tr>
	);
};

export default ClanItem;
