import { ComponentType } from 'react';
import { RouteProps } from 'react-router';

export interface IPublicRouteProps extends RouteProps {
	restricted: boolean;
	component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
	needHeader?: boolean;
	needSideBar?: boolean;
}
