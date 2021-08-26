import React from 'react';
import { IUser } from 'typings/common/IUser';
import { Rank, Avatar } from 'components';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

interface IProfileSocialList {
	items: IUser[];
}

export const ProfileSocialList: React.FC<IProfileSocialList> = ({ items }) => (
	<div className={styles.socialTableWrapper}>
		<table className={styles.socialTable}>
			<tbody>
				{console.log(items[0])}
				{items.map((item) => (
					<tr key={item.id}>
						<td>
							<Rank rank={item.rank} />
						</td>
						<td>
							<Link to={ROUTES.Users + '/' + item.username}>
								<Avatar avatar={item.img} size={30} />
							</Link>
						</td>
						<td>
							<Link to={ROUTES.Users + '/' + item.username}>
								<span>{item.name}</span>
							</Link>
						</td>
						<td>
							<Link to={item.clan?.id ? ROUTES.Clan + '/' + item.clan?.id : ROUTES.NotFound}>
								<span>{item.clan?.name}</span>
							</Link>
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
