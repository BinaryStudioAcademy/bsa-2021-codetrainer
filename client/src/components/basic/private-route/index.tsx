import { Header } from 'components';
import MainSidebar from 'components/common/main-sidebar';
import { headerProps } from 'containers/header/mock';
import { useAppSelector } from 'hooks/useAppSelector';
import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	needHeader?: boolean;
	needSideBar?: boolean;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
	const { component: Component, ...rest } = props;
	const { user } = useAppSelector((state) => state.auth);
	const isAuthorized = Boolean(user);

	return (
		<>
			{rest.needHeader ? <Header {...headerProps} /> : null}
			{rest.needSideBar ? (
				<div className="content_container">
					<MainSidebar />
					<Route
						{...rest}
						render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to="/sign-in" />)}
					/>
				</div>
			) : (
				<Route
					{...rest}
					render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to="/sign-in" />)}
				/>
			)}
		</>
	);
};

export default PrivateRoute;
