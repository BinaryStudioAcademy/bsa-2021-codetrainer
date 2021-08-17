import Header from 'containers/header';
import MainSidebar from 'components/common/main-sidebar';
import { ROUTES } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import PageContainer from '../page-container';

interface IPublicRouteProps extends RouteProps {
	restricted: boolean;
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	needHeader?: boolean;
	needSideBar?: boolean;
}

const PublicRoute = (props: IPublicRouteProps) => {
	const { restricted, component: Component, ...rest } = props;
	const { user } = useAppSelector((state) => state.auth.userData);
	const isAuthorized = Boolean(user);
	return (
		<>
			{rest.needHeader ? <Header /> : null}

			{rest.needHeader && rest.needSideBar ? (
				<>
					{rest.needSideBar ? <MainSidebar /> : null}
					<PageContainer>
						<Route
							{...rest}
							render={(props) =>
								isAuthorized && restricted ? <Redirect to={ROUTES.Home} /> : <Component {...props} />
							}
						/>
					</PageContainer>
				</>
			) : (
				<Route
					{...rest}
					render={(props) =>
						isAuthorized && restricted ? <Redirect to={ROUTES.Home} /> : <Component {...props} />
					}
				/>
			)}
		</>
	);
};

export default PublicRoute;
