import React from 'react';
import { IProfileRouterProps, ProfileRouter } from './profile-router';
import styles from './profile-info.module.scss';

export interface IProfileInfoProps {
	getTabContent: () => React.ReactNode;
	profileRouteProps: IProfileRouterProps;
}

export const ProfileInfo = ({ getTabContent, profileRouteProps }: IProfileInfoProps) => {
	return (
		<div className={styles.profileInfo}>
			<ProfileRouter {...profileRouteProps} />
			{getTabContent()}
		</div>
	);
};
