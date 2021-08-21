import React from 'react';
import { IUser } from 'typings/common/IUser';
import { Rank, Avatar } from 'components';

import styles from './styles.module.scss';

interface IProfileSocialList {
	items: IUser[];
}

export const ProfileSocialList: React.FC<IProfileSocialList> = ({ items }) => (
	<div className={styles.socialTableWrapper}>
		<table className={styles.socialTable}>
			<tbody>
				{items.map((item) => (
					<tr key={item.id}>
						<td>
							<Rank rank={item.rank} />
						</td>
						<td>
							<Avatar avatar={item.img} size={30} />
						</td>
						<td>
							<span>{item.name}</span>
						</td>
						<td>
							<span>{item.clan?.name}</span>
						</td>
						<td>
							<span>{item.honor}</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
