import { Header } from 'components';
import MainSidebar from 'components/common/main-sidebar';
import { headerProps } from 'containers/header/mock';
import { useAppSelector } from 'hooks/useAppSelector';
import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IPublicRouteProps extends RouteProps {
	restricted: boolean;
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	needHeader?: boolean;
	needSideBar?: boolean;
}

const PublicRoute = (props: IPublicRouteProps) => {
	const { restricted, component: Component, ...rest } = props;
	const { user } = useAppSelector((state) => state.auth);
	const isAuthorized = Boolean(user);

	return (
		<>
			{rest.needSideBar ? (
				<Route
					{...rest}
					render={(props) =>
						isAuthorized && restricted ? (
							<Redirect to="/" />
						) : (
							<>
								{rest.needHeader ? <Header {...headerProps} /> : null}

								<div className="content_container">
									<MainSidebar /> <Component {...props} />
								</div>
							</>
						)
					}
				/>
			) : (
				<Route
					{...rest}
					render={(props) => (isAuthorized && restricted ? <Redirect to="/" /> : <Component {...props} />)}
				/>
			)}
		</>
	);
};

export default PublicRoute;
