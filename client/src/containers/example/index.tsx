import React from 'react';
import styles from './example.module.scss';
import { default as HomePage } from 'containers/home-page';

const Example: React.FC = () => {
	return (
		<div className={styles.root}>
			<HomePage />
		</div>
	);
};

export default Example;
