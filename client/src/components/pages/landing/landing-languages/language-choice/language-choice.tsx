import React, { FC, SVGProps } from 'react';
import styles from './language-choice.module.scss';
import { LanguageItem } from './language-item';

export interface ILandingLanguagesProps {
	languages: language[];
}
export interface language {
	name: string;
	icon: svg;
}
type svg = FC<SVGProps<SVGSVGElement>>;
export const LanguageChoice = ({ languages }: ILandingLanguagesProps) => {
	return (
		<div className={styles.languageChoiceBlock}>
			<h3>To join you must first prove your skills.</h3>
			<h3>Choose your language to begin...</h3>
			<div className={styles.languageChoice}>
				{languages.map((lang: language, index: number) => {
					return <LanguageItem key={index} lang={lang} />;
				})}
			</div>
		</div>
	);
};
