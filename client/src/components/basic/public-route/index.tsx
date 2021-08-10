import React from 'react';
import { Header } from 'components';
import MainSidebar from 'components/common/main-sidebar';
import { ROUTES } from 'constants/routes';
import { headerProps } from 'containers/header/mock';
import { useAppSelector } from 'hooks/useAppSelector';
import { Route, Redirect } from 'react-router-dom';
import { IPublicRouteProps } from './types';

const PublicRoute: React.FC<IPublicRouteProps> = ({ restricted, component: Component, ...rest }) => {
	const { user } = useAppSelector((state) => state.auth.userData);
	const isAuthorized = Boolean(user);

	return (
		<>
			{rest.needSideBar ? (
				<div className="content_container">
					{rest.needHeader ? <Header {...headerProps} /> : null}
					<MainSidebar />
					<Route
						{...rest}
						render={(props) =>
							isAuthorized && restricted ? <Redirect to={ROUTES.Home} /> : <Component {...props} />
						}
					/>
				</div>
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
