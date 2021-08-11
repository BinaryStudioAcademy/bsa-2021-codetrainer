import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, Field } from 'formik';
import clsx from 'clsx';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { faGithubAlt, faTwitter, faLinkedinIn, faStackExchange } from '@fortawesome/free-brands-svg-icons';
import { ISocialProps } from './interfaces';
import styles from './social.module.scss';

const Social: React.FC<ISocialProps> = (props) => {
	return (
		<div className={styles.socialContainer}>
			<Formik
				initialValues={{
					twitterUrl: props.twitterUrl || '',
					linkedinUrl: props.linkedinUrl || '',
					stackUrl: props.stackUrl || '',
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form>
					<h4 className={styles.header}>Social</h4>
					<ul>
						<li className={styles.socialButton}>
							<button>
								<FontAwesomeIcon icon={faGithubAlt} className={styles.socialIcon} />
								Link your GitHub
							</button>
						</li>
						<li className={styles.socialItem}>
							<FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
							<Field
								id="twitter"
								name="twitterUrl"
								placeholder="Your twitter username"
								className={clsx(styles.inputField)}
							/>
						</li>
						<li className={styles.socialItem}>
							<FontAwesomeIcon icon={faLinkedinIn} className={styles.socialIcon} />
							<Field
								id="linkedin"
								name="linkedinUrl"
								placeholder="Your Linkedin Profile URL"
								className={clsx(styles.inputField)}
							/>
						</li>
						<li className={styles.socialItem}>
							<FontAwesomeIcon icon={faStackExchange} className={styles.socialIcon} />
							<Field
								id="stack"
								name="stackUrl"
								placeholder="Your StackExchange/StackOverflow URL"
								className={clsx(styles.inputField)}
							/>
						</li>
					</ul>
					<Button className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.submitBtn)}>
						Save Social Information
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default Social;
