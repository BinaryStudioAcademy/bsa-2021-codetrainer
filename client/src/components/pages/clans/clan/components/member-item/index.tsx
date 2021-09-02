import React from 'react';
import { Avatar, Button, Rank } from 'components';
import styles from './member-item.module.scss';
import { IMemberItemProps } from './types';
import { getFullDate } from 'helpers/date.helper';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';

const MemberItem: React.FC<IMemberItemProps> = ({ member, viewerRole, handleAddAdmin }) => {
	console.log(member);

	return (
		<tr className={styles.memberItem}>
			<td>
				<Rank rank={member.rank} />
			</td>
			<td>{<Avatar avatar={member.avatar} size={30} />}</td>
			<td>
				<Link to={`${ROUTES.Users}/${member.username}`}>
					{member.name} {member.surname}
				</Link>
			</td>
			<td>
				{member.profileClan?.role === 'admin' ? (
					member.profileClan?.role
				) : viewerRole === 'admin' ? (
					<Button className={clsx(ButtonClasses.red)} onClick={() => handleAddAdmin(member.id)}>
						Add admin
					</Button>
				) : null}
			</td>
			<td>{getFullDate(member.createdAt)}</td>
			<td>{member.honor}</td>
		</tr>
	);
};

export default MemberItem;
