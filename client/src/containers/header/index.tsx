import React from 'react';
import { Header as HeaderComponent } from 'components';
import { useAppSelector } from 'hooks/useAppSelector';
import { IHeaderProps } from 'components/common/header/index';
import { getListItems } from './items-dropdown';

const Header: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth.userData);

	const headerProps: IHeaderProps = {
		name: `${user?.name} ${user?.surname}`,
		rank: 7,
		notificationCounter: 4,
		mark: 400,
		listItems: getListItems(),
	};

	return <HeaderComponent {...headerProps} />;
};

export default Header;
