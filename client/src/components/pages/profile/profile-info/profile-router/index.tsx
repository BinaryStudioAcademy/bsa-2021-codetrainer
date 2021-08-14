import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export interface IProfileRouterProps {
	tabItems: IMenuItemConfig[];
	activeTabId: string;
}

export interface IMenuItemConfig {
	tabId: string;
	tabNameText: string;
	onClick: () => void;
}

interface StyledTabsProps {
	label: string;
	onClick: () => void;
}

const StyledTabs = withStyles({
	root: {
		borderBottom: '1px solid #EAECF1',
		padding: 'none',
	},
	indicator: {
		background: '#705FF5',
	},
})(Tabs);

const StyledTab = withStyles({
	root: {
		opacity: 1,
		textTransform: 'none',
		fontFamily: 'Montserrat',
		minWidth: 72,
		'&:hover': {
			color: '#705FF5',
			opacity: 1,
		},
		'&$selected': {
			color: '#705FF5',
		},
		'&:focus': {
			color: '#705FF5',
		},
	},
	selected: {},
})((props: StyledTabsProps) => <Tab disableRipple {...props} />);

export const ProfileRouter = ({ tabItems, activeTabId }: IProfileRouterProps) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
		setValue(newValue);
	};
	return (
		<StyledTabs value={value} onChange={handleChange}>
			{tabItems.map((tabItem: IMenuItemConfig) => {
				return (
					<StyledTab
						key={`${tabItem.tabId}`}
						label={tabItem.tabNameText}
						onClick={() => {
							if (tabItem.tabId !== activeTabId) {
								tabItem.onClick();
							}
						}}
					/>
				);
			})}
		</StyledTabs>
	);
};
