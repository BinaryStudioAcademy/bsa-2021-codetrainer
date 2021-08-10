import React from 'react';
import logo from 'assets/images/logo.svg';
import styles from './loader.module.scss';

const FullscreenLoader: React.FC = () => {
	return (
		<div className={styles.screen}>
			<div className={styles.loader}>
				{logo}
				<div className={styles.loaderContainer}>
					<div className={styles.loaderBar} />
				</div>
			</div>
		</div>
	);
};

export default FullscreenLoader;
