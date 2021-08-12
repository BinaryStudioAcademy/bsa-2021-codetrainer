import React from 'react';
import { IMember } from 'containers/clans/types';
import MemberItem from '../member-item';
import style from './members-list.module.scss';
import { IMembersListProps } from './types';

const MemberList: React.FC<IMembersListProps> = ({ members }) => {
	return (
		<div className={style.membersList}>
			<table className={style.membersListTable}>
				<tbody>
					{members.map((member: IMember) => (
						<MemberItem member={member} key={member.id} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MemberList;
