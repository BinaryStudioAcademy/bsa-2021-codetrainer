import React from 'react';
import Header from 'containers/header';
import MainSidebar from 'components/common/main-sidebar';
import { ROUTES } from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import PageContainer from 'components/basic/page-container';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'typings/root-state';
import { useEffect } from 'react';
import * as actions from './logic/actions';

interface IPrivateRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	needHeader?: boolean;
	needSideBar?: boolean;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
	const { component: Component, ...rest } = props;
	const { user } = useAppSelector((state) => state.auth.userData);
	const isAuthorized = Boolean(user);
	const dispatch = useDispatch();
	const id = useSelector((state: IRootState) => state.sidebar.taskId);

	useEffect(() => {
		dispatch(actions.getTasks());
	}, []);

	return (
		<>
			{rest.needHeader ? <Header /> : null}

			{rest.needHeader && rest.needSideBar ? (
				<>
					{rest.needSideBar ? <MainSidebar id={id} /> : null}
					<PageContainer>
						<Route
							{...rest}
							render={(props) =>
								isAuthorized ? <Component {...props} /> : <Redirect to={ROUTES.SignIn} />
							}
						/>
					</PageContainer>
				</>
			) : (
				<Route
					{...rest}
					render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to={ROUTES.SignIn} />)}
				/>
			)}
		</>
	);
};

export default PrivateRoute;
