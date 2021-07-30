import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Menu, MenuItem } from '@blueprintjs/core';
import '../../../../../styles/index.scss';

const ProfileRouter: React.FC = () => {
	const match = useRouteMatch();

	return (
		<Menu className="navmenu">
			<MenuItem href={match.url + '/stats'} className="navmenu-item active" text="Index"></MenuItem>
			<MenuItem href={match.url + '/stats'} className="navmenu-item" text="Challenge"></MenuItem>
			<MenuItem href={match.url + '/stats'} className="navmenu-item" text="Solution"></MenuItem>
			<MenuItem href={match.url + '/stats'} className="navmenu-item" text="Social"></MenuItem>
			<MenuItem href={match.url + '/stats'} className="navmenu-item" text="Collections"></MenuItem>
		</Menu>
	);
};
export default ProfileRouter;
