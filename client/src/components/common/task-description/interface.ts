import { ReactNode } from 'react';

export interface ITaskDescriptionProps {
	rank: number;
	name: string;
	description: string | ReactNode;
	examples: string | ReactNode;
	content?: string;
	tags: string[];
}
