import React from 'react';
import { Header } from 'components';
import MainSidebar from 'components/common/main-sidebar';
import { headerProps } from 'containers/header/mock';
import { useAppSelector } from 'hooks/useAppSelector';
import { Route, Redirect } from 'react-router-dom';
import { IPrivateRouteProps } from './types';

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ component: Component, ...rest }) => {
	const { user } = useAppSelector((state) => state.auth.userData);
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
