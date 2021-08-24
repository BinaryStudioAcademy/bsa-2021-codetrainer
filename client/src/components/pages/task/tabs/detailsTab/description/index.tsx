import React from 'react';
import styles from './description.module.scss';

export const Description = () => {
	return (
		<div>
			<div className={styles.description}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<h3 className={styles.examplesHeader}>Examples</h3>
				<code className={styles.code}>Lorem ipsum dolor sit amet,</code>
			</div>
		</div>
	);
};
