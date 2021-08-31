import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './description.module.scss';

export interface IDescriptionProps {
	description: string;
}

export const Description = ({ description }: IDescriptionProps) => {
	return (
		<div className={styles.container}>
			<ReactMarkdown>{description}</ReactMarkdown>
		</div>
	);
};
