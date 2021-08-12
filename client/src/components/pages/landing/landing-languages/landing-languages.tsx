import React from 'react';
import styles from './landing-languages.module.scss';
import { InvitationBlock } from './invitation-block';
import { LanguageChoice } from './language-choice';
import { LANGUAGES } from './config';

interface ILandingLanguagesProps {}
export const LandingLanguages = (props: ILandingLanguagesProps) => {
	return (
		<div className={styles.languages}>
			<InvitationBlock />
			<LanguageChoice languages={LANGUAGES} />
		</div>
	);
};
