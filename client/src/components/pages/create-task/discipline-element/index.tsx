import React from 'react';
import clsx from 'clsx';

import styles from './discipline-element.module.scss';

interface IDisciplineElement {
	icon: React.ReactElement;
	text: string;
	active: boolean;
	onClick: () => void;
}

const DisciplineElement: React.FC<IDisciplineElement> = ({ icon, text, active, onClick }) => {
	return (
		<div className={clsx(styles.element, { [styles.elementActive]: active })} onClick={onClick}>
			{icon}
			<span className={styles.text}>{text}</span>
		</div>
	);
};

export default DisciplineElement;
