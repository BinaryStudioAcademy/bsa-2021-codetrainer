import React from 'react';
import { Checkbox as MaterialCheckbox, FormControlLabel, withStyles } from '@material-ui/core';

interface ICheckboxProps {
	label: string;
	name: string;
}

const Checkbox = withStyles({
	root: {
		color: '#EC4179',
		'&$checked': {
			color: '#EC4179',
		},
	},
})(({ label, name }: ICheckboxProps) => <FormControlLabel control={<MaterialCheckbox name={name} />} label={label} />);

export default Checkbox;
