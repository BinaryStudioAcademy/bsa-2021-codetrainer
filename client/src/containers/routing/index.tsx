import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import { PublicRoute } from 'components/basic';
import SignIn from 'containers/SignIn';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={false} path="/sign-in" component={SignIn} />
	</Switch>
);

export default Routing;
