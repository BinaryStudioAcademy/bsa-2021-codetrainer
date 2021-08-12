import React from 'react';
import styles from './footer.module.scss';

interface IFooterProps {}
export const Footer = (props: IFooterProps) => {
	return (
		<div className={styles.footer}>
			<p>© 2021 Codetrainer</p>
			<a href="#">About</a>
			<a href="#">API</a>
			<a href="#">Blog</a>
			<a href="#">Privacy</a>
			<a href="#">Terms</a>
			<a href="#">Contact</a>
		</div>
	);
};
