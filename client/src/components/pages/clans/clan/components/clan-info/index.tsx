import React from 'react';
import { Rank, Button } from 'components';
import { getMonthName } from 'helpers/date';
import MemberRoles from 'common/enum/app/clans/member-roles';
import { WebApi } from 'typings/webapi';
import { ButtonClasses } from 'components/basic/button';
import { IClanInfoProps } from './types';
import styles from './clan-info.module.scss';

const ClanInfo: React.FC<IClanInfoProps> = ({ clan, leaveClan }) => {
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
				<Rank honor={clan.honour} />
				<span>
					{getMonthName(clan.createdAt)} {clan.createdAt.getFullYear()}
				</span>
				<span>
					Admin: {clanAdmin?.name} {clanAdmin?.surname}
				</span>
				<span>Members: {clan.members.length}</span>
				<Button className={ButtonClasses.red} onClick={() => leaveClan()}>
					Leave
				</Button>
			</div>
		</div>
	);
};

export default ClanInfo;
