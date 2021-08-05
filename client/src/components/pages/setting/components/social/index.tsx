import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt, faTwitter, faLinkedinIn, faStackExchange } from '@fortawesome/free-brands-svg-icons';
import styles from './social.module.scss';

const Social: React.FC = () => {
	return (
		<div className={styles.socialContainer}>
			<h4 className={styles.header}>Social</h4>
			<ul>
				<li className={styles.socialItem}>
					<FontAwesomeIcon icon={faGithubAlt} className={styles.socialIcon} />
					Link your GitHub
				</li>
				<li className={styles.socialItem}>
					<FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
					Your twitter username
				</li>
				<li className={styles.socialItem}>
					<FontAwesomeIcon icon={faLinkedinIn} className={styles.socialIcon} />
					Your Linkedin Profile URL
				</li>
				<li className={styles.socialItem}>
					<FontAwesomeIcon icon={faStackExchange} className={styles.socialIcon} />
					Your StackExchange/StackOverflow URL
				</li>
			</ul>
		</div>
	);
};

export default Social;
