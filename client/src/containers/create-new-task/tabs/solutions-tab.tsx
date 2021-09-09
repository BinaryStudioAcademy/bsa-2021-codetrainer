import React, { useState } from 'react';
import { ICreateTabsProps, CreateTabs } from 'components';
import { TaskTabTypes } from 'common';

const Tabs: Map<number, string> = new Map([
	[0, 'completeSolution'],
	[1, 'initialSolution'],
]);

interface ISolutionsTab {
	initialSolution?: string;
	completeSolution?: string;
	onChange: (type: string, text: string) => void;
}

export const SolutionsTab: React.FC<ISolutionsTab> = ({ initialSolution = '', completeSolution = '', onChange }) => {
	const [tab, setTab] = useState<number>(0);
	const tabsCode: ICreateTabsProps = {
		selectedTab: tab,
		tabs: [
			{
				header: {
					title: 'Complete Solution',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: completeSolution,
			},
			{
				header: {
					title: 'Initial Solution',
				},
				editable: true,
				type: TaskTabTypes.CODE,
				text: initialSolution,
			},
			{
				header: {
					title: 'Help',
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `### In "Complete Solution" you should solve your own task
	### In "Initial Soultion" write code that will be given to the user at the start`,
			},
		],
		onChange: (text) => onChange(Tabs.get(tab) as string, text),
		onSelectTab: (tab) => setTab(tab),
	};
	return <CreateTabs {...tabsCode} />;
};
