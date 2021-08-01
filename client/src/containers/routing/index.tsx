import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import { PublicRoute } from 'components';
import { Profile } from 'components/pages/profile';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute restricted={false} path="/users/:name" component={Profile} />
	</Switch>
);

export default Routing;
