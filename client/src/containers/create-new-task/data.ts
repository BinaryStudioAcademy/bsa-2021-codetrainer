import { FC, SVGProps } from 'react';
import { ReactComponent as FundamentalsIcon } from 'assets/icons/books-icon.svg';
import { ReactComponent as RankUpIcon } from 'assets/icons/rank-up-icon.svg';
import { ReactComponent as PracticeIcon } from 'assets/icons/practice-icon.svg';
import { ReactComponent as BetaIcon } from 'assets/icons/beta-icon.svg';
import { ReactComponent as RandomIcon } from 'assets/icons/shuffle-icon.svg';
// import { Discipline, IDisciplineItem } from './logic/models';
import { ISelectProps } from 'components/basic/select/interface';

export const insertData = {
	textDescription: `### In this task you have to find 2 biggest numbers in the array`,
	completeSolution: `function twoOldestAges(ages){
	var oldest = 0, nextOldest;
	for(var i = 0;i < ages.length;i++){
		var age = ages[i];
		if (age > oldest){
			nextOldest = oldest;
			oldest = age;
		}
		else if(age > nextOldest){
			nextOldest = age;
		}
	}
	return [nextOldest, oldest];
	}`,
	initialSolution: `//return the two oldest/oldest ages within the array of ages passed in.
// it should return the two ages as a sorted array, youngest age first
function twoOldestAges(ages){
			
}`,
	testCases: `const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;
	
describe("twoOldestAges", function() {
it("given [1,5,87,45,8,8]", function() {
assert.deepEqual(twoOldestAges([1, 5, 87, 45, 8, 8]), [45, 87]);
});

it("given [6,5,83,5,3,18]", function() {
assert.deepEqual(twoOldestAges([6, 5, 83, 5, 3, 18]), [18, 83]);
});
});`,
};

export const goToValues = [
	{
		id: '1',
		title: 'Details',
	},
	{
		id: '2',
		title: 'Discourse',
	},
	{
		id: '3',
		title: 'Solutions',
	},
	{
		id: '4',
		title: 'Trainer',
	},
];

export const challengeSelect = {
	id: '',
	title: 'New challenge',
};

export interface IDisciplineItem {
	value: Discipline;
	iconFC: TSvgFC;
	label: string;
}

export enum Discipline {
	FUNDAMENTALS = 'fundamentals',
	RANK_UP = 'rank-up',
	PRACTICE = 'practice',
	BETA = 'beta',
	RANDOM = 'random',
}

export type TSvgFC = FC<SVGProps<SVGSVGElement>>;

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

export const LANGUAGES_SELECT: ISelectProps['values'] = [
	{
		id: '1',
		title: '7.3',
		iconFC: RankUpIcon,
	},
	{
		id: '2',
		title: '7.0',
		iconFC: RankUpIcon,
	},
	{
		id: '3',
		title: '6.2',
		iconFC: RankUpIcon,
	},
	{
		id: '4',
		title: '5.9',
		iconFC: RankUpIcon,
	},
];
