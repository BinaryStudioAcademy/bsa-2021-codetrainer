import React, { useMemo } from 'react';
import { Header as HeaderComponent } from 'components';
import * as actions from '../user/logic/actions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/useAppSelector';
import { IHeaderProps } from 'components/common/header/index';
import menuProfile from 'assets/icons/header/menu/avatar.svg';
import menuSettings from 'assets/icons/header/menu/settings.svg';
import menuChallenge from 'assets/icons/header/menu/goal.svg';
import menuSignout from 'assets/icons/header/menu/logout.svg';
import { ROUTES } from 'constants/routes';
import { useHistory } from 'react-router-dom';



const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        dispatch(actions.logoutUser());
    };
    const { user } = useAppSelector((state) => state.auth.userData);

    const headerProps: IHeaderProps = useMemo(() => ({
        name: `${user?.name} ${user?.surname}`,
        rank: 7,
        notificationCounter: 4,
        mark: 400,
        listItems: [
            {
                id: '1',
                image: menuProfile,
                text: 'View Profile',
                onClick: () => history.push(ROUTES.UserProfile),
            },
            {
                id: '2',
                image: menuSettings,
                text: 'Account Settings',
                onClick: () => history.push(ROUTES.Setting),
            },
            {
                id: '3',
                image: menuChallenge,
                text: 'New Challenge',
                onClick: () => history.push(ROUTES.createTask),
            },
            {
                id: '4',
                image: menuSignout,
                text: 'Sign out',
                onClick: handleLogout
            },
        ],
    }), [history, handleLogout]);

    return (
        <HeaderComponent {...headerProps} />
    );
};

export default Header;