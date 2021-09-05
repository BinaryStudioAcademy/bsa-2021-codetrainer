import React from 'react';
import styles from './contributors.module.scss';
import { Avatar } from 'components/basic';
import { WebApi } from 'typings/webapi';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

export interface IContributorsProps {
	contributors: WebApi.Entities.IUser[];
}

export const Contributors = ({ contributors }: IContributorsProps) => {
	return (
		<div className={styles.contributors}>
			{contributors.length ? (
				<>
					<p>These users have contributed to this task:</p>
					<div className={styles.users}>
						{contributors.map((item) => {
							return (
								<Link to={`${ROUTES.Users}/${item.username}`} key={item.username}>
									<Avatar size={60} avatar={item.avatar} key={item.username} />
								</Link>
							);
						})}
					</div>
				</>
			) : (
				'No users have contributed to this task'
			)}
		</div>
	);
};
