import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface StyledTabsProps {
	label: string;
	onClick: () => void;
}

const StyledTabs = withStyles({
	root: {
		padding: 'none',
		backgroundColor: 'white',
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
		backgroundColor: 'white',
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
})((props: StyledTabsProps) => <Tab disableRipple {...props} />);

export interface ITabItem {
	tab: string;
	onClick: () => React.ReactChild;
}

export interface ITabsRouterProps {
	tabItems: ITabItem[];
	activeTabId: string;
}

export const TabsRouter = ({ tabItems, activeTabId }: ITabsRouterProps) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
		setValue(newValue);
	};
	return (
		<StyledTabs value={value} onChange={handleChange}>
			{tabItems.map((tabItem) => {
				return (
					<StyledTab
						key={`${tabItem.tab}`}
						label={tabItem.tab}
						onClick={() => {
							if (tabItem.tab !== activeTabId) {
								tabItem.onClick();
							}
						}}
					/>
				);
			})}
		</StyledTabs>
	);
};
