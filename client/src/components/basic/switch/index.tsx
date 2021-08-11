import React, { FC } from 'react';
import { Switch as MaterialSwitch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface ISwitchProps {
	checked: boolean;
	onChange: (check: boolean) => void;
}

const StyledSwitch = withStyles({
	switchBase: {
		color: '#969696',
		'&$checked': {
			color: '#ec4179',
		},
		'&$checked + $track': {
			backgroundColor: '#ec4179',
		},
	},
	checked: {},
	track: { backgroundColor: '#8c8e91' },
})(MaterialSwitch);

const Switch: FC<ISwitchProps> = ({ checked, onChange, children }) => {
	return (
		<>
			<StyledSwitch checked={checked} onClick={() => onChange(checked)} />
			{children}
		</>
	);
};

export default Switch;
