import React from 'react';
import { StatsTab } from '../../../../components';
import { IStatsProps } from 'components/pages/profile/profile-info/tabs/stats';

export const Stats: React.FC<IStatsProps> = (props) => {
	return <StatsTab {...props} />;
};
