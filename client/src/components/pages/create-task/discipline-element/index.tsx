import React from 'react';
import clsx from 'clsx';

import styles from './discipline-element.module.scss';

interface IDisciplineElement {
	icon: React.ElementType;
	text: string;
	active: boolean;
	onClick: () => void;
}

const DisciplineElement: React.FC<IDisciplineElement> = ({ icon: Icon, text, active, onClick }) => {
	return (
		<div className={clsx(styles.element, { [styles.elementActive]: active })} onClick={onClick}>
			<Icon className={styles.icon} />
			<span className={styles.text}>{text}</span>
		</div>
	);
};

export default DisciplineElement;
