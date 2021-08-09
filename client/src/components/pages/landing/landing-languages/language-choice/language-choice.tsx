import React from 'react';
import styles from './language-choice.module.scss';
import { LanguageItem } from './language-item';

interface ILandingLanguagesProps {
	languages: string[];
}
export const LanguageChoice = ({ languages }: ILandingLanguagesProps) => {
	return (
		<div className={styles.languageChoiceBlock}>
			<h3>To join you must first prove your skills.</h3>
			<h3>Choose your language to begin...</h3>
			<div className={styles.languageChoice}>
				{languages.map((lang: string, index: number) => {
					return <LanguageItem key={index} />;
				})}
			</div>
		</div>
	);
};
