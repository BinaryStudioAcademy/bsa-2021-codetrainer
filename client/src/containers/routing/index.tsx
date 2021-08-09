import React, { useEffect } from 'react';
import { Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import { Clans, Clan } from 'containers/clans';
import SignUp from 'containers/sign-up';
import SignIn from 'containers/sign-in';
import { ROUTES } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { AuthAccessToken } from './logic/state';
import TestPrivate from './test-private';
import Example from 'containers/example';
import { FullscreenLoader } from 'components';
import { PublicRoute, PrivateRoute } from 'components';
import HomePage from 'containers/home-page';
import { Profile } from 'containers/profile';
import { SearchPage } from 'containers/search-page';
import { ForgotPassword, ChangePassword } from 'components/pages';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => {
	const { accessToken } = useAppSelector((state) => state.routing);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.checkRefreshToken());
	}, [dispatch]);
	if (accessToken === AuthAccessToken.LOADING) {
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
			<PrivateRoute exact path={ROUTES.Main} component={HomePage} needHeader={true} needSideBar={true} />
			<PrivateRoute exact path={ROUTES.UserProfile} component={Profile} needHeader={true} needSideBar={true} />
			<PrivateRoute exact path={ROUTES.Search} component={SearchPage} needHeader={true} needSideBar={true} />
			<PublicRoute
				exact
				restricted={false}
				path={ROUTES.SignUp}
				component={SignUp}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute
				exact
				restricted={false}
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
				restricted={false}
				path={ROUTES.ChangePassword}
				component={ChangePassword}
				needHeader={false}
				needSideBar={false}
			/>
			<PrivateRoute exact path="/private" component={TestPrivate} needHeader={false} needSideBar={false} />
			<PublicRoute
				exact
				restricted={false}
				needHeader={true}
				needSideBar={true}
				path={ROUTES.Clans}
				component={Clans}
			/>
			<PublicRoute
				exact
				restricted={false}
				needHeader={true}
				needSideBar={true}
				path={ROUTES.Clan}
				component={Clan}
			/>
		</Switch>
	);
};

export default Routing;
