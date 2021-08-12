import React from 'react';
import { Rank } from 'components';
import { IClanItemProps } from './types';
import { Button } from 'components/basic';
import { MemberRoles } from 'common/enum/app/clans';
import { ButtonClasses } from 'components/basic/button';
import { getMonthName } from 'common/helpers/date';

const ClanItem: React.FC<IClanItemProps> = ({ clan, userId, joinClan, leaveClan }) => {
	const currentUserMember = clan.members.find((member) => member.id === userId);

	return (
		<tr>
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
						<Button className={ButtonClasses.red} onClick={() => leaveClan(clan.id)}>
							Leave
						</Button>
					) : null
				) : (
					<Button onClick={() => joinClan(clan.id)}>Join</Button>
				)}
			</td>
		</tr>
	);
};

export default ClanItem;
