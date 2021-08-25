import { useUserSelector } from 'hooks/useAppSelector';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FlagIcon from '@material-ui/icons/Flag';
import { ROUTES } from 'constants/routes';
import * as actions from '../user/logic/actions';

export const getListItems = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useUserSelector();

	const handleClick = (route: string) => history.push(route);
	const handleLogout = () => dispatch(actions.logoutUser());
	return [
		{
			id: '1',
			icon: PersonOutlineIcon,
			text: 'View Profile',
			onClick: () => handleClick(ROUTES.Users + `/${user?.username}`),
		},
		{
			id: '2',
			icon: SettingsIcon,
			text: 'Account Settings',
			onClick: () => handleClick(ROUTES.Setting),
		},
		{
			id: '3',
			icon: FlagIcon,
			text: 'New Challenge',
			onClick: () => handleClick(ROUTES.createTask),
		},
		{
			id: '4',
			icon: ExitToAppIcon,
			text: 'Sign out',
			onClick: handleLogout,
		},
	];
};
