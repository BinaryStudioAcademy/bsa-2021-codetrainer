import React from 'react';
import styles from './solution.module.scss';
import PeopleIcon from '@material-ui/icons/People';
import { WebApi } from 'typings/webapi';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';

export interface ISolutionProps {
	solution: WebApi.Entities.ISolution;
}

export const Solution = ({ solution }: ISolutionProps) => {
	return (
		<div className={styles.solution}>
			<div className={styles.header}>
				<PeopleIcon />
				<Link to={`${ROUTES.Users}/${solution.user.username}`}>
					<h3>
						{solution.user.name} {solution.user.surname}
					</h3>
				</Link>
			</div>
			<div className={styles.code}>
				<code>{solution.code}</code>
			</div>
		</div>
	);
};
