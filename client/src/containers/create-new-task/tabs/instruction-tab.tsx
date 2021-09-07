import React, { useState } from 'react';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { ICreateTabsProps, CreateTabs } from 'components';
import { TaskTabTypes } from 'common';

interface IInstructionTab {
	description?: string;
	onChange: (type: string, text: string) => void;
}

export const InstructionTab: React.FC<IInstructionTab> = ({ description = '', onChange }) => {
	const [instructionTab, setInstructionTab] = useState(0);
	const tabsInstructions: ICreateTabsProps = {
		selectedTab: instructionTab,
		tabs: [
			{
				header: {
					title: 'Description',
				},
				type: TaskTabTypes.TEXT,
				text: description,
				editable: true,
			},
			{
				header: {
					title: 'Preview',
					toolTipTitle: 'Look how your description looks',
					icon: {
						name: faInfo,
					},
				},
				type: TaskTabTypes.MARKDOWN,
				text: description,
				markdownContent: description,
			},
			{
				header: {
					title: 'Help',
					toolTipTitle: <em>comment</em>,
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `# [Read more about markdown](https://guides.hexlet.io/markdown/)`,
			},
		],
		onChange: (text) => onChange('description', text),
		onSelectTab: (tab) => setInstructionTab(tab),
	};
	return <CreateTabs {...tabsInstructions} />;
};
