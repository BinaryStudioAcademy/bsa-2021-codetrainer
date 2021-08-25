import React from 'react';
import clsx from 'clsx';
import Container from '../../common/container';
import styles from './skills.module.scss';
import common from '../../common/common.module.scss';
import logo from 'assets/icons/js.svg';

const SkillsSection = () => {
	return (
		<section className={clsx(common.section, styles.skillsSection, common.sectionFilled)}>
			<Container className={common.sectionContainer}>
				<div className={styles.skillsSectionDescription}>
					<h2 className={common.sectionTitle}>Sharpen your skills</h2>
					<div className={common.sectionText}>
						<p>Challenge yourself, get honor and achieve first place on the Leaderboard.</p>
						<p>Master your current language of choice, or expand your understanding of a new one.</p>
					</div>
				</div>
				<div className={styles.skillsSectionLanguages}>
					<img className={styles.language} src={logo} />
				</div>
			</Container>
		</section>
	);
};

export default SkillsSection;
