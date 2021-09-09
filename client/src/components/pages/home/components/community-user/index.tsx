import React from 'react';
import { IUser } from '../community/interface';
import { Rank, Avatar } from 'components';
import styles from './community-user.module.scss';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';

interface ICommunityUserProps {
	user: IUser;
}

const CommunityMember: React.FC<ICommunityUserProps> = ({ user }) => {
	const isClanMember = Boolean(user.clan);

	return (
		<tr className={styles.communityUser}>
			<td>
				<Rank rank={user.rank} />
			</td>
			<td>
				<Avatar avatar={user.avatar} size={50} />
			</td>
			<td>
				<Link to={`${ROUTES.Users}/${user?.username}`}> {`${user.name} ${user?.surname}`}</Link>
			</td>
			<td>
				{isClanMember ? <Link to={`${ROUTES.Clan}/${user.clan?.id}`}> {user.clan?.name}</Link> : 'Not in clan'}
			</td>
			<td>{user.honor}</td>
		</tr>
	);
};

export default CommunityMember;
