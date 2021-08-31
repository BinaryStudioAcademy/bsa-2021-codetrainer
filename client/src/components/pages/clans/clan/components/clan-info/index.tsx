import React from 'react';
import { Rank, Button } from 'components';
import MemberRoles from 'common/enum/app/clans/member-roles';
import { WebApi } from 'typings/webapi';
import { ButtonClasses } from 'components/basic/button';
import { IClanInfoProps } from './types';
import styles from './clan-info.module.scss';
import clsx from 'clsx';
import { getFullDate } from 'helpers/date.helper';

const ClanInfo: React.FC<IClanInfoProps> = ({ clan, isOwnClan, leaveClan, joinClan, handleInviteClick }) => {
	const clanAdmin = clan.members.find(
		(member: WebApi.Entities.IMember) => member.profileClan.role === MemberRoles.ADMIN,
	);

	return (
		<div className={styles.clanInfo}>
			{clan.avatar && (
				<div className={styles.clanInfoAvatar}>
					<img src={clan.avatar} alt={clan.name} />
				</div>
			)}
			<div className={styles.clanInfoDescription}>
				<span>{clan.name}</span>
				<Rank rank={clan.rank} />
				<Rank honor={clan.honor} />
				<span>{getFullDate(clan.createdAt)}</span>
				<span>
					Admin: {clanAdmin?.name} {clanAdmin?.surname}
				</span>
				<span>Members: {clan.numberOfMembers}</span>
				{isOwnClan ? (
					<Button className={ButtonClasses.red} onClick={() => leaveClan()}>
						Leave
					</Button>
				) : (
					<Button className={ButtonClasses.blue} onClick={() => joinClan(clan.id)}>
						Join
					</Button>
				)}
				<Button className={clsx(ButtonClasses.blue, ButtonClasses.filled)} onClick={handleInviteClick}>
					Invite a friend
				</Button>
			</div>
		</div>
	);
};

export default ClanInfo;
