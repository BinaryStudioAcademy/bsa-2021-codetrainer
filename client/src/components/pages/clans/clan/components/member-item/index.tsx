import React from 'react';
import { Rank } from 'components';
import styles from './member-item.module.scss';
import { IMemberItemProps } from './types';
import { getFullDate } from 'helpers/date.helper';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';

const MemberItem: React.FC<IMemberItemProps> = ({ member }) => {
	return (
		<tr className={styles.memberItem}>
			<td>
				<Rank rank={member.rank} />
			</td>
			<td>{member.avatar ? <img src={member.avatar} alt="Avatar" /> : <span>No avatar</span>}</td>
			<td>
				<Link to={`${ROUTES.Users}/${member.username}`}>
					{member.name} {member.surname}
				</Link>
			</td>
			<td>{getFullDate(member.createdAt)}</td>
			<td>{member.honor}</td>
		</tr>
	);
};

export default MemberItem;
