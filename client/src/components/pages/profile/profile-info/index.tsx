import React from 'react';
import { IProfileRouterProps, ProfileRouter } from './profile-router';
import styles from './profile-info.module.scss';
import { Stats } from 'containers/profile/tabs/stats';
import { statsProps } from 'containers/profile/mocks';

export interface IProfileInfoProps {
	getTabContent: () => React.ReactNode;
	profileRouteProps: IProfileRouterProps;
}

export const ProfileInfo = ({ getTabContent, profileRouteProps }: IProfileInfoProps) => {
	return (
		<div className={styles.profileInfo}>
			<ProfileRouter {...profileRouteProps} />
			{getTabContent()}
			<Stats statsInfo={{ ...statsProps }} />
		</div>
	);
};
