export enum TaskTabType {
	INSTRUCTIONS = 'instructions',
	OUTPUT = 'output',
}

export interface ITaskInstructionsProps {
	data: {
		title: string;
		favorites: number;
		rating: number;
		createdBy: { name: string; href: string };
		rank: number;
	};
	activeTab: string;
	onClick: (tab: string) => void;
}
