import React from 'react';
import Container from '../../common/container';
import styles from './welcome.module.scss';
import { Button } from 'components';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import { useHistory } from 'react-router';
import { ROUTES } from 'constants/routes';

const WelcomeSection = () => {
	const history = useHistory();

	return (
		<section className={styles.welcomeSection}>
			<Container>
				<div className={styles.welcomeSectionDescription}>
					<p className={styles.welcomeSectionText}>Let us begin our trip!</p>
					<Button
						className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.btn)}
						onClick={() => history.push(ROUTES.SignUp)}
					>
						Let&apos;s start!
					</Button>
				</div>
			</Container>
		</section>
	);
};

export default WelcomeSection;
