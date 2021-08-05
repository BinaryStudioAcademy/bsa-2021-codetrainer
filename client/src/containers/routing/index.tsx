import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import { PublicRoute, PrivateRoute, SignUp, Spinner } from 'components';
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
		return <Spinner />;
	}
	return (
		<Switch>
			<PublicRoute exact restricted={true} path="/" component={Example} />
			<PublicRoute exact restricted={false} path="/register" component={SignUp} />
			<PublicRoute exact restricted={false} path="/sign-in" component={SignIn} />
			<PrivateRoute path="/private" component={TestPrivate} />
		</Switch>
	);
};

export default Routing;
