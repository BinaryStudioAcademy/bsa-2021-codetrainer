import { ReactNode } from 'react';

export interface ITaskDescriptionProps {
	id: string;
	rank: number;
	name: string;
	description: string | ReactNode;
	examples: string | ReactNode;
	content?: string;
	tags: string[];
}
