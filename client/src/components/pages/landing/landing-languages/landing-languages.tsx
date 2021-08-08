import React from 'react';
import styles from './landing-languages.module.scss'
import {InvitationBlock} from './invitation-block'
import {LanguageChoice} from './language-choice'

interface ILandingLanguagesProps {}
export const LandingLanguages = (props: ILandingLanguagesProps) => {
	return <div className={styles.languages}>
		<InvitationBlock />
		<LanguageChoice />
	</div>;
};
