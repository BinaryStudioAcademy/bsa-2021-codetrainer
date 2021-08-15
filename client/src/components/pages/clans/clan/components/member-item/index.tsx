import React from 'react';
import { Rank } from 'components';
import { getMonthName } from 'helpers/date';
import styles from './member-item.module.scss';
import { IMemberItemProps } from './types';

const MemberItem: React.FC<IMemberItemProps> = ({ member }) => {
	return (
		<tr className={styles.memberItem}>
			<td>
				<Rank rank={member.rank} />
			</td>
			<td>{member.avatar ? <img src={member.avatar} alt="Avatar" /> : <span>No avatar</span>}</td>
			<td>
				{member.name} {member.surname}
			</td>
			<td>
				{getMonthName(member.createdAt)} {member.createdAt.getFullYear()}
			</td>
			<td>{member.honour}</td>
		</tr>
	);
};

export default MemberItem;
