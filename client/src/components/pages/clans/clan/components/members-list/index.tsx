import React from 'react';
import { WebApi } from 'typings/webapi';
import MemberItem from '../member-item';
import style from './members-list.module.scss';
import { IMembersListProps } from './types';

const MemberList: React.FC<IMembersListProps> = ({
	members,
	viewerRole,
	handleAddAdmin,
	viewerId,
	handleDeleteMember,
}) => {
	return (
		<div className={style.membersList}>
			<table className={style.membersListTable}>
				<tbody>
					{members.map((member: WebApi.Entities.IMember) => (
						<MemberItem
							member={member}
							key={member.id}
							viewerRole={viewerRole}
							handleAddAdmin={handleAddAdmin}
							viewerId={viewerId}
							handleDeleteMember={handleDeleteMember}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MemberList;
