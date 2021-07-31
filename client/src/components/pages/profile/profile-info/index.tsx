import React from 'react';
import ProfileRouter from './profile-router';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Stats from './tabs/stats';
import styles from './profile-info.module.scss';

interface IProfileInfoProps {}

export const ProfileInfo: React.FC<IProfileInfoProps> = (props) => {
	const match = useRouteMatch();

	return (
		<div className={styles.profileInfo}>
			<ProfileRouter />
			<Switch>
				<Route path={match.url + '/stats'} exact>
					<Stats />
				</Route>
				<Route path={match.url} exact>
					<Stats />
				</Route>
			</Switch>
		</div>
	);
};
