import { Button } from 'components/basic';
import React from 'react';
import styles from './language-item.module.scss'
import clsx from 'clsx'
import { ButtonClasses } from 'components/basic/button';
import { language } from './language-choice';

interface ILandingLanguageItemProps {
	lang:language
}
export const LanguageItem = ({lang}: ILandingLanguageItemProps) => {
	return (
	<Button className={clsx(ButtonClasses.red,styles.languageItem)}>
		{<lang.icon width={20} height={20}/>}
		{lang.name}
	</Button>
	);
};
