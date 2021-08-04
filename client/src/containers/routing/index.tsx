import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import { PrivateRoute, PublicRoute } from 'components';
import HomePageContainer from 'containers/home-page';

interface IRoutingProps {}

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<PublicRoute exact restricted={false} path="/" component={Example} />
		<PrivateRoute path="/home-page" component={HomePageContainer} />
	</Switch>
);

export default Routing;
