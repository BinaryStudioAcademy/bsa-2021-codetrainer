import React from 'react';
import { Switch } from 'react-router-dom';
import Example from 'containers/example';
import { PublicRoute } from 'components';
import Header from 'components/common/header';
import avatar from 'assets/images/header/avatar.png';

interface IRoutingProps { }

const Routing: React.FC<IRoutingProps> = () => (
	<Switch>
		<Header
      name = 'Rayna Herwitz'
      rank = {8}
      mark = {455}
      notificationCounter = {3}
      avatar = {avatar}
    />
		<PublicRoute exact restricted={false} path="/" component={Example} />
	</Switch>
);

export default Routing;
