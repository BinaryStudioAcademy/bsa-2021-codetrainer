import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import SignIn from 'containers/sign-in';
import { PublicRoute } from 'components/basic';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={false} path="/sign-in" component={SignIn} />
	</Switch>
);

export default Routing;
