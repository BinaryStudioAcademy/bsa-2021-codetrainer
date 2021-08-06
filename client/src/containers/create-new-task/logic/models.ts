import { FC, SVGProps } from 'react';

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
