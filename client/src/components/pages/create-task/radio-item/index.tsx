import { Radio, RadioProps } from '@blueprintjs/core';
import React from 'react';
import styles from './radio-item.module.scss';

interface IRadioItemProps extends RadioProps {
	icon: React.ReactElement;
	text: string;
}

const RadioItem: React.FC<IRadioItemProps> = ({ icon, text, ...remains }) => {
	return (
		<Radio {...remains} className={styles.radioItem}>
			<div className={styles.radioLabel}>
				{icon}
				<span className={styles.text}>{text}</span>
			</div>
		</Radio>
	);
};

// RadioGroup checks if chldren has displayName === Radio.displayName
RadioItem.displayName = Radio.displayName;

export default RadioItem;
