import React from 'react';
import ProfileRouter from './profile-router/profile-router';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Stats from './stats/stats';

interface IProfileInfoProps {
}

export const ProfileInfo: React.FC<IProfileInfoProps> = (props) => {
	const match = useRouteMatch();

	return (
		<>
			<ProfileRouter />
			<Switch>
				<Route path={match.url + '/stats'} exact>
					<Stats />
				</Route>
				<Route path={match.url} exact>
					<Stats />
				</Route>
			</Switch>
		</>
	);
}