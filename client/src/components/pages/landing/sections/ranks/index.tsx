import React from 'react';
import clsx from 'clsx';
import { Rank } from 'components';
import Container from '../../common/container';
import common from '../../common/common.module.scss';
import styles from './ranks.module.scss';

const RanksSection = () => {
	return (
		<section className={clsx(common.section, styles.ranksContainer, common.sectionFilled)}>
			<Container>
				<div className={styles.ranksSectionDescription}>
					<h2 className={common.sectionTitle}>Earn ranks and honors</h2>
					<div className={clsx(common.sectionText, styles.ranksSectionText)}>
						<p>
							Challenges are ranked to approximate difficulty. As you complete higher ranked challenges,
							you progress through the ranks so we can match you with relevant challenges.
						</p>
					</div>
				</div>
				<div className={styles.ranks}>
					<div className={styles.ranksSection}>
						<Rank rank={1} />
						<Rank rank={2} />
						<Rank rank={3} />
					</div>
					<div className={styles.ranksSection}>
						<Rank rank={4} />
						<Rank rank={5} />
						<Rank rank={6} />
					</div>
					<div className={styles.ranksSection}>
						<Rank rank={7} />
						<Rank rank={8} />
						<Rank rank={9} />
					</div>
				</div>
			</Container>
		</section>
	);
};

export default RanksSection;
