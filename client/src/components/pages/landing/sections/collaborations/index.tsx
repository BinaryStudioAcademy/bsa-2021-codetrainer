import React from 'react';
import clsx from 'clsx';
import Container from '../../common/container';
import ImageBlock from '../../common/image-block';
import common from '../../common/common.module.scss';
import styles from './collaborations.module.scss';

const CollaborationsSection = () => {
	return (
		<section className={clsx(common.section)}>
			<Container className={common.sectionContainer}>
				<ImageBlock src="" className={styles.collaborationsSectionLogo} />
				<div className={styles.collaborationsSectionDescription}>
					<h2 className={common.sectionTitle}>Gain collaborative wisdom</h2>
					<div className={common.sectionText}>
						<p>Compare your solution with others after each challenge for greater understanding.</p>
						<p>Discuss the challenge, best practices, and innovative techniques with the community.</p>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default CollaborationsSection;
