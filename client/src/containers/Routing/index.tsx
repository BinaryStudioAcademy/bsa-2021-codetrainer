import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import PublicRoute from 'components/PublicRoute';
import { Profile } from 'containers/Profile';
interface Props {}

const Routing: React.FC<Props> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute restricted={false} path="/users/:name" component={Profile} />
	</Switch>
);

export default Routing;
