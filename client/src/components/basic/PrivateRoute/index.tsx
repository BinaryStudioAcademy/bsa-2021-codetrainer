import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute = (props: Props) => {
	const { component: Component, ...rest } = props;
	const isAuthorized = false;

	return <Route {...rest} render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
