import React from 'react';
import { IUser } from '../community/interface';
import { Rank, Avatar } from 'components';
import { useHistory } from 'react-router';
import styles from './community-user.module.scss';
import { ROUTES } from 'constants/routes';

interface ICommunityUserProps {
	user: IUser;
}

const CommunityMember: React.FC<ICommunityUserProps> = ({ user }) => {
	const isClanMember = Boolean(user.clan);
	const history = useHistory();

	const goToUserProfile = () => {
		history.push(`${ROUTES.Users}/${user.username}`);
	};

	return (
		<tr className={styles.communityUser} onClick={goToUserProfile}>
			<td>
				<Rank rank={user.rank} />
			</td>
			<td>
				<Avatar avatar={user.imageSource} size={50} />
			</td>
			<td>{user.name}</td>
			<td
				onClick={(event: React.MouseEvent<HTMLTableDataCellElement>) => {
					event.stopPropagation();

					if (isClanMember) {
						history.push(`${ROUTES.Clans}/${user.clan?.id}`);
					} else {
						goToUserProfile();
					}
				}}
			>
				{isClanMember ? user.clan?.name : 'Not in clan'}
			</td>
			<td>{user.honor}</td>
		</tr>
	);
};

export default CommunityMember;
