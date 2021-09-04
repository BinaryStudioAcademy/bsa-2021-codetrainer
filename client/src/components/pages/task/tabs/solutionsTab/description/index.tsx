import { Markdown } from 'components/common';
import React from 'react';
import styles from './description.module.scss';

export interface IDescriptionProps {
	description: string;
}

export const Description = ({ description }: IDescriptionProps) => {
	return (
		<div className={styles.container}>
			<Markdown text={description} />
		</div>
	);
};
