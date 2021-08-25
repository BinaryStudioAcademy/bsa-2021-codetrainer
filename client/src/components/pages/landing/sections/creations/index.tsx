import React from 'react';
import clsx from 'clsx';
import Container from '../../common/container';
import styles from './creations.module.scss';
import common from '../../common/common.module.scss';
import logo from 'assets/icons/pencil-icon.svg';

const CreationsSection = () => {
	return (
		<section className={clsx(common.section, styles.skillsSection, common.sectionFilled)}>
			<Container className={common.sectionContainer}>
				<div className={styles.creationsSectionLogo}>
					<img src={logo} />
				</div>
				<div className={styles.creationsSectionDescription}>
					<h2 className={common.sectionTitle}>Create your own kata</h2>
					<div className={common.sectionText}>
						<p>Author challenges that focus on your interests and train specific skillsets.</p>
						<p>Challenge the community with your insight and code understanding.</p>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default CreationsSection;
