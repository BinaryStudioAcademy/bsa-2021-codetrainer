import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import HomePage from 'containers/home-page';
import { Profile } from 'containers/profile';
import {
	PrivateRoute,
	PublicRoute,
	ForgotPassword,
	ChangePassword,
	SignUp,
	SearchPage,
	FullscreenLoader,
} from 'components';
import SignIn from 'containers/sign-in';
import { useAppSelector } from 'hooks/useAppSelector';
import * as actions from './logic/actions';
import { AuthAccessToken } from './logic/state';
import TestPrivate from './test-private';
import { LandingPage } from 'containers/landing-page';

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
			<PublicRoute exact restricted={true} path="/" component={Example} />
			<PrivateRoute path="/home" component={HomePage} />
			<PublicRoute exact restricted={false} path="/users/:name" component={Profile} />
			<PublicRoute exact restricted={true} path="/register" component={SignUp} />
			<PublicRoute exact restricted={true} path="/sign-in" component={SignIn} />
			<PublicRoute exact restricted={false} path="/forgot-password" component={ForgotPassword} />
			<PublicRoute exact restricted={false} path="/change-password" component={ChangePassword} />
			<PublicRoute exact restricted={false} path="/search" component={SearchPage} />
			<PrivateRoute path="/private" component={TestPrivate} />
			<PublicRoute exact restricted={true} path="/landing" component={LandingPage} />
		</Switch>
	);
};

export default Routing;
