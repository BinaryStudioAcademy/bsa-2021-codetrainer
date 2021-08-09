import React from 'react';
import { Rank, Button } from 'components';
import getMounthName from 'common/helpers/date/get-mounth-name';
import MemberRoles from 'common/enum/app/clans/member-roles';
import { IClan, IMember } from 'containers/clans/types';
import styles from './clan-info.module.scss';

const ClanInfo: React.FC<{ clan: IClan }> = ({ clan }) => {
	const clanAdmin = clan.members.find((member: IMember) => member.profileClan.role === MemberRoles.ADMIN);

	return (
		<div className={styles.clanInfo}>
			{clan.avatar && (
				<div>
					<img src={clan.avatar} alt={clan.name} />
				</div>
			)}
			<div className={styles.clanInfoDescription}>
				<span>{clan.name}</span>
				<Rank rank={clan.rank} />
				<Rank honor={clan.honour} />
				<span>
					{getMounthName(clan.createdAt)} {clan.createdAt.getFullYear()}
				</span>
				<span>
					Admin: {clanAdmin?.name} {clanAdmin?.surname}
				</span>
				<span>Members: {clan.members.length}</span>
				<Button color="red">Leave</Button>
			</div>
		</div>
	);
};

export default ClanInfo;
