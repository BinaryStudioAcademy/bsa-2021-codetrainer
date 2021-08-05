import { useAppSelector } from 'hooks/useAppSelector';
import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IPublicRouteProps extends RouteProps {
	restricted: boolean;
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PublicRoute = (props: IPublicRouteProps) => {
	const { restricted, component: Component, ...rest } = props;
	const { user } = useAppSelector((state) => state.auth);
	const isAuthorized = Boolean(user);

	return (
		<Route
			{...rest}
			render={(props) => (isAuthorized && restricted ? <Redirect to="/private" /> : <Component {...props} />)}
		/>
	);
};

export default PublicRoute;
