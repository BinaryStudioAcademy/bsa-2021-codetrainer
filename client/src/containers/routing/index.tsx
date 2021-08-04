import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import HomePage from 'containers/home-page';
import { Profile } from 'containers/profile';
import { PrivateRoute, PublicRoute, ForgotPassword, ChangePassword, SearchPage } from 'components';
import SignIn from 'containers/sign-in';
import SignUp from 'containers/sign-up';
import { ROUTES } from 'constants/routes';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path={ROUTES.Main} component={Example} />
		<PublicRoute exact restricted={false} path={ROUTES.SignUp} component={SignUp} />
		<PublicRoute exact restricted={false} path={ROUTES.SignIn} component={SignIn} />
		<PublicRoute exact restricted={false} path={ROUTES.ForgotPassword} component={ForgotPassword} />
		<PublicRoute exact restricted={false} path={ROUTES.ChangePassword} component={ChangePassword} />
		<PrivateRoute path={ROUTES.Home} component={HomePage} />
		<PrivateRoute path={ROUTES.UserProfile} component={Profile} />
		<PublicRoute exact restricted={false} path={ROUTES.Search} component={SearchPage} />
	</Switch>
);

export default Routing;
