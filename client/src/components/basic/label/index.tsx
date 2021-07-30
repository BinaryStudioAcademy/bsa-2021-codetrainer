import React from 'react';
import styles from './label.module.scss';

interface ILabelProps {
	label: string | number;
	color: string;
}

const Label: React.FC<ILabelProps> = (props) => {
	const changebleStyles = {
		color: props.color,
		borderColor: props.color,
	};

	return (
		<div className={styles.label} style={changebleStyles}>
			{props.label}
		</div>
	);
};

export default Label;
