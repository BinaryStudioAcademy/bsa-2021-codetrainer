import { ReactComponent as FundamentalsIcon } from 'assets/icons/books-icon.svg';
import { ReactComponent as RankUpIcon } from 'assets/icons/rank-up-icon.svg';
import { ReactComponent as PracticeIcon } from 'assets/icons/practice-icon.svg';
import { ReactComponent as BetaIcon } from 'assets/icons/beta-icon.svg';
import { ReactComponent as RandomIcon } from 'assets/icons/shuffle-icon.svg';
import { Discipline, IDisciplineItem } from './logic/models';

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
