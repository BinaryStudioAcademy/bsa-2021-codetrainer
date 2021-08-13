import { TaskTabTypes } from 'common';
import { IconName } from '@blueprintjs/icons';

export interface ITabProps {
	onChange: (text: string) => void;
	value?: string;
	editable?: boolean;
}

export interface ICreateTabsProps {
	selectedTab: number;
	tabs: {
		header: {
			title: string;
			toolTipTitle?: string | JSX.Element;
			icon?: {
				name: IconName;
				color?: string;
			};
		};
		type: TaskTabTypes;
		editable?: boolean;
		text?: string;
		markdownContent?: string;
	}[];
	onChange: (text: string) => void;
	onSelectTab: (tab: number) => void;
}

export type TCreateTabs = ICreateTabsProps['tabs'];
