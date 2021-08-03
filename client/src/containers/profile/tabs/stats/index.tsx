import React from 'react';
import { StatsTab } from 'components';
import { IStatsProps } from 'components/pages/profile/profile-info/tabs/stats';

interface IStatsContainerProps {
	statsInfo: IStatsProps;
}

export const Stats: React.FC<IStatsContainerProps> = ({ statsInfo }) => {
	return <StatsTab {...statsInfo} />;
};
