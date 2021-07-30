import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import PublicRoute from 'components/basic/PublicRoute';

interface Props {}

const Routing: React.FC<Props> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
	</Switch>
);

export default Routing;
