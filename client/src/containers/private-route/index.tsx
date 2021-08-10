import * as React from 'react';
import Header from 'containers/header';
import MainSidebar from 'components/common/main-sidebar';
import { ROUTES } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	needHeader?: boolean;
	needSideBar?: boolean;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
	const { component: Component, ...rest } = props;
	const { user } = useAppSelector((state) => state.auth.userData);
	const isAuthorized = Boolean(user);
	return (
		<>
			{rest.needHeader ? <Header /> : null}
			{rest.needSideBar ? <MainSidebar /> : null}
			<div className="content_container">
				<Route
					{...rest}
					render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to={ROUTES.SignIn} />)}
				/>
			</div>
		</>
	);
};

export default PrivateRoute;
