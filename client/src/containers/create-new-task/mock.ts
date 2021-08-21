import { ReactComponent as FundamentalsIcon } from 'assets/icons/books-icon.svg';
import { ReactComponent as RankUpIcon } from 'assets/icons/rank-up-icon.svg';
import { ReactComponent as PracticeIcon } from 'assets/icons/practice-icon.svg';
import { ReactComponent as BetaIcon } from 'assets/icons/beta-icon.svg';
import { ReactComponent as RandomIcon } from 'assets/icons/shuffle-icon.svg';
import { Discipline, IDisciplineItem } from './logic/models';
import { ISelectProps } from 'components/basic/select/interface';

export const DISCIPLINE_ITEMS: IDisciplineItem[] = [
	{
		value: Discipline.FUNDAMENTALS,
		iconFC: FundamentalsIcon,
		label: 'Fundamentals',
	},
	{
		value: Discipline.RANK_UP,
		iconFC: RankUpIcon,
		label: 'Rank Up',
	},
	{
		value: Discipline.PRACTICE,
		iconFC: PracticeIcon,
		label: 'Practice',
	},
	{
		value: Discipline.BETA,
		iconFC: BetaIcon,
		label: 'Beta',
	},
	{
		value: Discipline.RANDOM,
		iconFC: RandomIcon,
		label: 'Random',
	},
];

export const SELECT_PROPS: ISelectProps = {
	values: [
		{
			id: "1",
			title: '7.3',
			iconFC: RankUpIcon,
		},
		{
			id: "2",
			title: '7.0',
			iconFC: RankUpIcon,
		},
		{
			id: "3",
			title: '6.2',
			iconFC: RankUpIcon,
		},
		{
			id: "4",
			title: '5.9',
			iconFC: RankUpIcon,
		},
	],
};
