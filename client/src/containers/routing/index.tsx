import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import HomePage from 'containers/home-page';
import { Profile } from 'containers/profile';
import { SearchPage } from 'containers/search-page';
import { PrivateRoute, PublicRoute, ForgotPassword, ChangePassword, SignUp, FullscreenLoader } from 'components';
import SignIn from 'containers/sign-in';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { AuthAccessToken } from './logic/state';
import TestPrivate from './test-private';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => {
	const { accessToken } = useAppSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.checkRefreshToken());
	}, [dispatch]);
	if (accessToken === AuthAccessToken.LOADING) {
		return <FullscreenLoader />;
	}
	return (
		<Switch>
			<PublicRoute exact restricted={false} path="/" component={Example} needHeader={false} needSideBar={false} />
			<PrivateRoute path="/home" component={HomePage} needHeader={true} needSideBar={true} />
			<PrivateRoute path="/users/:name" component={Profile} needHeader={true} needSideBar={true} />
			<PrivateRoute exact path="/search" component={SearchPage} needHeader={true} needSideBar={true} />
			<PublicRoute
				exact
				restricted={false}
				path="/register"
				component={SignUp}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute
				exact
				restricted={false}
				path="/sign-in"
				component={SignIn}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute
				exact
				restricted={false}
				path="/forgot-password"
				component={ForgotPassword}
				needHeader={false}
				needSideBar={false}
			/>
			<PublicRoute
				exact
				restricted={false}
				path="/change-password"
				component={ChangePassword}
				needHeader={false}
				needSideBar={false}
			/>
			<PrivateRoute path="/private" component={TestPrivate} needHeader={false} needSideBar={false} />
		</Switch>
	);
};

export default Routing;
