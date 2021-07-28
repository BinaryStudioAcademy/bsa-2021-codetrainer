import React from 'react';
import { Switch } from 'react-router-dom';
// import Example from 'containers/Example';
import Loader from 'containers/Loader';
import PublicRoute from 'components/PublicRoute';

interface Props {}

const Routing: React.FC<Props> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Loader} />
	</Switch>
);

export default Routing;
