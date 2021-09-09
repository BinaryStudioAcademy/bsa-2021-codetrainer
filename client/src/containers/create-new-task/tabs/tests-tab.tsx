import React, { useState } from 'react';
import { ICreateTabsProps, CreateTabs } from 'components';
import { TaskTabTypes } from 'common';

const Tabs: Map<number, string> = new Map([
	[0, 'testCases'],
	[1, 'exampleTestCases'],
]);

interface ITestsTab {
	testCases?: string;
	exampleTestCases?: string;
	onChange: (type: string, text: string) => void;
}

export const TestsTab: React.FC<ITestsTab> = ({ testCases = '', exampleTestCases = '', onChange }) => {
	const [tab, setTab] = useState(0);
	const tabsCode: ICreateTabsProps = {
		selectedTab: tab,
		tabs: [
			{
				header: {
					title: 'Test Cases',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: testCases,
			},
			{
				header: {
					title: 'Example Test Cases',
				},
				editable: true,
				type: TaskTabTypes.CODE,
				text: exampleTestCases,
			},
			{
				header: {
					title: 'Help',
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `### "Test Cases" is where you write all hidden tests for the user's solution.
			### "Example Test Cases" is where you write all example test for user's solution.
		
			Remember! Your solution in "Complete solution" should pass all these tests too!`,
			},
		],
		onChange: (text) => onChange(Tabs.get(tab) as string, text),
		onSelectTab: (tab) => setTab(tab),
	};
	return <CreateTabs {...tabsCode} />;
};
