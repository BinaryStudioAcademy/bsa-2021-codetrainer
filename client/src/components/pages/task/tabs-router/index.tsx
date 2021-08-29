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
		backgroundColor: 'var(--container-color)',
	},
	indicator: {
		background: 'var(--purple)',
	},
})(Tabs);

const StyledTab = withStyles({
	root: {
		opacity: 1,
		textTransform: 'none',
		fontFamily: 'Montserrat',
		minWidth: 72,
		backgroundColor: 'var(--container-color)',
		'&:hover': {
			color: 'var(--purple)',
			opacity: 1,
		},
		'&$selected': {
			color: 'var(--purple)',
		},
		'&:focus': {
			color: 'var(--purple)',
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
