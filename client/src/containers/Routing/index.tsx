import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/Example';
import PublicRoute from '../../components/basic/public-route';
import SearchTask from '../../components/basic/private-route';

interface Props {}

const Routing: React.FC<Props> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PublicRoute exact restricted={false} path="/search" component={SearchTask} />
	</Switch>
);

export default Routing;
