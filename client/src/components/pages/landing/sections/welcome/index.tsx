import React from 'react';
import Container from '../../common/container';
import styles from './welcome.module.scss';

const WelcomeSection = () => {
	return (
		<section className={styles.welcomeSection}>
			<Container>
				<div className={styles.welcomeSectionDescription}>
					<p className={styles.welcomeSectionText}>
						To join you must first prove your skills. Let us begin our trip!
					</p>
				</div>
			</Container>
		</section>
	);
};

export default WelcomeSection;
