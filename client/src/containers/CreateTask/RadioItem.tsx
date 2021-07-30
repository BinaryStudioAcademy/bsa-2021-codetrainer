import React from 'react';
import styles from './create-task-settings.module.scss';

interface Props {
	component: React.ReactElement;
	checkedState: string;
	setChecked: (value: string) => void;
	classNameComp: string;
	text: string;
}

const RadioItem: React.FC<Props> = (props) => {
	return (
		<div
			className={
				props.checkedState === props.classNameComp ? styles.radioItem + ' ' + styles.active : styles.radioItem
			}
			onClick={() => {
				props.setChecked(props.classNameComp);
			}}
		>
			{props.component}
			<label>{props.text}</label>
		</div>
	);
};

export default RadioItem;
