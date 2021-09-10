import { FC, SVGProps } from 'react';
import TuneIcon from '@material-ui/icons/Tune';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BugReportIcon from '@material-ui/icons/BugReport';

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
	icon: React.ElementType;
	label: string;
}

export enum Discipline {
	FUNDAMENTALS = 'fundamentals',
	ALGORITHMS = 'algorithms',
	BUG_FIXES = 'bug-fixes',
}

export type TSvgFC = FC<SVGProps<SVGSVGElement>>;

export const DISCIPLINE_ITEMS: IDisciplineItem[] = [
	{
		value: Discipline.FUNDAMENTALS,
		icon: LibraryBooksIcon,
		label: 'Fundamentals',
	},
	{
		value: Discipline.ALGORITHMS,
		icon: TuneIcon,
		label: 'Algorithms',
	},
	{
		value: Discipline.BUG_FIXES,
		icon: BugReportIcon,
		label: 'Bug-fixings',
	},
];
