import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
	const { component: Component, ...rest } = props;
	const isAuthorized = true;

	return (
		<Route {...rest} render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to="/sign-in" />)} />
	);
};

export default PrivateRoute;
