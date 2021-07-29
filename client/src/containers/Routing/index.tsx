import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import PublicRoute from 'components/PublicRoute';
import SignIn from 'containers/SignIn';

interface Props {}

const Routing: React.FC<Props> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={false} path="/sign-in" component={SignIn} />
	</Switch>
);

export default Routing;
