import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import { Profile } from 'containers/profile';
import { PrivateRoute, PublicRoute, ForgotPassword, ChangePassword, SignUp } from 'components';
import SignIn from 'containers/sign-in';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PrivateRoute path="/users/:name" component={Profile} />
		<PublicRoute exact restricted={false} path="/register" component={SignUp} />
		<PublicRoute exact restricted={false} path="/sign-in" component={SignIn} />
		<PublicRoute exact restricted={false} path="/forgot-password" component={ForgotPassword} />
		<PublicRoute exact restricted={false} path="/change-password" component={ChangePassword} />
	</Switch>
);

export default Routing;
