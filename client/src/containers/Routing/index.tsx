import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import PublicRoute from 'components/PublicRoute';
import SignUp from 'components/sign-up';

interface Props {}

const Routing: React.FC<Props> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={false} path="/register" component={SignUp} />
	</Switch>
);

export default Routing;
