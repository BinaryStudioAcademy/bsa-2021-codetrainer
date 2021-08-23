import React, { useEffect } from 'react';
import { Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import { Clans, Clan } from 'containers/clans';
import { CreateTaskPage } from 'containers/create-new-task';
import SettingPage from 'containers/setting-page';
import { FullscreenLoader, NotFound, PublicRoute } from 'components';
import TaskPage from '../task-page';
import SignIn from 'containers/sign-in';
import SignUp from 'containers/sign-up';
import { ForgotPassword, ChangePassword } from 'containers/recover-password';
import { ROUTES } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from 'containers/user/logic/actions';
import { LandingPageCointainer } from 'containers/landing-page';
import Example from 'containers/example';
import HomePage from 'containers/home-page';
import { Profile } from 'containers/profile';
import { UserAccessToken } from 'containers/user/logic/state';
import { SearchPage } from 'containers/search-page';
import PrivateRoute from 'containers/private-route';
import Github from 'containers/github';
import { Redirect, Route } from 'react-router-dom';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => {
	const { accessToken } = useAppSelector((state) => state.auth.userData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.checkRefreshToken());
	}, [dispatch]);
	if (accessToken === UserAccessToken.LOADING) {
		return <FullscreenLoader />;
	}
	return (
		<Switch>
			<PublicRoute
				exact
				restricted={false}
				path={ROUTES.Main}
				component={Example}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute exact restricted={true} path={ROUTES.Landing} component={LandingPageCointainer} />
			<PrivateRoute exact path={ROUTES.Home} component={HomePage} needHeader={true} needSideBar={true} />
			<PrivateRoute
				exact
				path={ROUTES.createTask}
				component={CreateTaskPage}
				needHeader={true}
				needSideBar={true}
			/>
			<PrivateRoute path={ROUTES.TaskInstructions} component={TaskPage} needHeader={true} needSideBar={true} />
			<PrivateRoute path={ROUTES.Users + '/:username'} component={Profile} needHeader={true} needSideBar={true} />
			<PrivateRoute exact path={ROUTES.Search} component={SearchPage} needHeader={true} needSideBar={true} />
			<PrivateRoute path={ROUTES.Setting} component={SettingPage} needHeader={true} needSideBar={true} />
			<PublicRoute
				exact
				restricted={true}
				path={ROUTES.SignUp}
				component={SignUp}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute
				exact
				restricted={true}
				path={ROUTES.SignIn}
				component={SignIn}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute
				exact
				restricted={false}
				path={ROUTES.ForgotPassword}
				component={ForgotPassword}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute
				exact
				restricted={true}
				path={ROUTES.ChangePassword}
				component={ChangePassword}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute restricted={false} path={ROUTES.Github + '/:endpoint'} component={Github} />
			<PrivateRoute exact needHeader={true} needSideBar={true} path={ROUTES.Clans} component={Clans} />
			<PrivateRoute exact needHeader={true} needSideBar={true} path={ROUTES.Clan + '/:id'} component={Clan} />
			<Route path={ROUTES.NotFound} component={NotFound} />
			<Redirect from="*" to={ROUTES.NotFound} />
		</Switch>
	);
};

export default Routing;
