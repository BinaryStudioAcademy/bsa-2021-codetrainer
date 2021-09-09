import React from 'react';
import clsx from 'clsx';
import Container from '../../common/container';
import ImageBlock from '../../common/image-block';
import common from '../../common/common.module.scss';
import styles from './training.module.scss';

const TrainingSection = () => {
	return (
		<section className={clsx(common.section)}>
			<Container className={common.sectionContainer}>
				<ImageBlock src="/assets/images/landing/Rectangle39.png" className={styles.trainingSectionLogo} />
				<div className={styles.trainingSectionDescription}>
					<h2 className={common.sectionTitle}>Train on challenges</h2>
					<div className={common.sectionText}>
						<p>
							Solve the challenge with your coding style right in the browser and use test cases (TDD) to
							check it as you progress.
						</p>
						<p>Retrain with new, creative, and optimized approaches.</p>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default TrainingSection;
