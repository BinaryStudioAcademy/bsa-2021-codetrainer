import { TaskTabTypes } from 'common';
import { IconName } from '@blueprintjs/icons';

export interface ITabProps {
	onChange: (text: string) => void;
	value?: string;
	editable?: boolean;
}

export interface ICreateTabsProps {
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
}

export type TCreateTabs = ICreateTabsProps['tabs'];
