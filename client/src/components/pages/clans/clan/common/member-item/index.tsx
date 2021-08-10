import React from 'react';
import { IMember } from 'containers/clans/types';
import { Rank } from 'components';
import getMounthName from 'common/helpers/date/get-mounth-name';

const MemberItem: React.FC<{ member: IMember }> = ({ member }) => {
	return (
		<tr>
			<td>
				<Rank rank={member.rank} />
			</td>
			<td>{member.avatar ? <img src="" alt="" /> : <span>No avatar</span>}</td>
			<td>
				{member.name} {member.surname}
			</td>
			<td>
				{getMounthName(member.createdAt)} {member.createdAt.getFullYear()}
			</td>
			<td>{member.honour}</td>
		</tr>
	);
};

export default MemberItem;
