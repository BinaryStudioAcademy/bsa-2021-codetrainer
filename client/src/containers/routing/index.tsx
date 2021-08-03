import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import SignIn from 'containers/sign-in';
import SignUp from 'containers/sign-up';
import { PublicRoute, ForgotPassword, ChangePassword } from 'components';
import { ROUTES } from 'constants/routes';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path={ROUTES.Main} component={Example} />
		<PublicRoute exact restricted={false} path={ROUTES.Register} component={SignUp} />
		<PublicRoute exact restricted={false} path={ROUTES.Login} component={SignIn} />
		<PublicRoute exact restricted={false} path={ROUTES.ForgotPassword} component={ForgotPassword} />
		<PublicRoute exact restricted={false} path={ROUTES.ChangePassword} component={ChangePassword} />
	</Switch>
);

export default Routing;
