import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
		'&:selected': {
			color: 'var(--purple)',
		},
		'&:focus': {
			color: 'var(--purple)',
		},
	},
})((props: { label: string }) => <Tab disableRipple {...props} />);

export interface ITabsRouterProps {
	tabItems: { name: string; id: number }[];
	activeTabId: number;
	onChange: (tab: number) => void;
}

export const TabsRouter = ({ tabItems, activeTabId, onChange }: ITabsRouterProps) => {
	const handleChange = (_: React.ChangeEvent<any>, newValue: number) => {
		onChange(newValue);
	};
	return (
		<StyledTabs value={activeTabId} onChange={handleChange}>
			{tabItems.map(({ name, id }) => (
				<StyledTab key={id.toString()} label={name} />
			))}
		</StyledTabs>
	);
};
