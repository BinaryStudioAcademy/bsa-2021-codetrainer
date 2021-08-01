import React from 'react';
import Points, { IPointsProps } from './points';
import HonorBreakdown, { IHonorBreakdownProps } from './honor-breakdown';
import Languages, { ILanguagesProps } from './languages';
import Community, { ICommunityProps } from './community';
import styles from './stats.module.scss';

import RankBreakdown, { IRankBreakdownProps } from './rank-breakdown';

export interface IStatsProps {
	points: IPointsProps;
	languages: ILanguagesProps;
	honorBreakdown: IHonorBreakdownProps;
	rankBreakdown: IRankBreakdownProps;
	community: ICommunityProps;
}

export const Stats: React.FC<IStatsProps> = (props) => {
	return (
		<div className={styles.stats}>
			<Points {...props.points} />
			<Languages {...props.languages} />
			<HonorBreakdown {...props.honorBreakdown} />
			<RankBreakdown {...props.rankBreakdown} />
			<Community {...props.community} />
		</div>
	);
};
