import React, { useMemo } from 'react';
import MemberRoles from 'common/enum/app/clans/member-roles';
import { IClanInfoProps } from './types';
import { getFullDate } from 'helpers/date.helper';
import { Avatar, List, Rank } from 'components/basic';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { Markdown } from 'components/pages/create-task/common/create-tabs/markdown';
import styles from './clan-info.module.scss';

const ClanInfo: React.FC<IClanInfoProps> = ({ clan }) => {
	const clanAdmin = useMemo(() =>
		clan.members
			.find((member) => member.profileClan?.role === MemberRoles.ADMIN)
	, [clan]);

	const clanList = useMemo(() => (
		<List items={[
			{
				name: 'Members',
				value: `${clan.numberOfMembers} / ${clan.maxMembers}`,
			},
			{
				name: 'Admin',
				value: <Link to={`${ROUTES.Users}/${clanAdmin?.username}`}>{clanAdmin?.name} {clanAdmin?.surname}</Link>
			},
			{
				name: 'Type',
				value: clan.isPublic ? 'Public' : 'Private',
			},
			{
				name: 'Created',
				value: getFullDate(new Date(clan.createdAt))
			},
		]} />
	), [clan]);

	return (
		<div className={styles.clanInfo}>
			{clan.cover && (
				<div className={styles.clanInfoCover}>
					<img src={clan.cover} />
				</div>
			)}
			<div className={styles.clanInfoWrapper}>
				<div className={styles.clanInfoName}>
					<Avatar avatar={clan.avatar} size={60} />
					{clan.name}
					<Rank rank={clan.rank} />
					<Rank honor={clan.honor} />
				</div>
				<div className={styles.clanInfoDetails}>
					<div className={styles.clanInfoList}>
						{clanList}
					</div>
					<div className={styles.clanInfoDescription}>
						<Markdown text={clan.description || 'No description provided'} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClanInfo;
