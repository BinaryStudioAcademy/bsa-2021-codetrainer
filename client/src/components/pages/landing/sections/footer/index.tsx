import React from 'react';
import Container from '../../common/container';
import styles from './footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container className={styles.footerContainer}>
				<span className={styles.footerCopyright}>2021 Codetrainer</span>
			</Container>
		</footer>
	);
};

export default Footer;
