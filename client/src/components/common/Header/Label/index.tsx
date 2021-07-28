import React from 'react';
import styles from './label.module.scss';

interface Prop {
	label: string | number;
	color: string;
}

const Label: React.FC<Prop> = (props) => {

	const changebleStyles = {
		color: props.color,
		borderColor: props.color
	}

	return (
		<div className={styles.label} style={changebleStyles}>{props.label}</div>
	);
}

export default Label;
