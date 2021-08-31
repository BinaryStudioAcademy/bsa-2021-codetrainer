import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './description.module.scss';

export interface IDescriptionProps {
	description: string;
	exampleTestCases?: string;
}

export const Description = ({ description, exampleTestCases }: IDescriptionProps) => {
	return (
		<div>
			<div className={styles.description}>
				{description || exampleTestCases ? (
					<>
						<ReactMarkdown>{description}</ReactMarkdown>
						{exampleTestCases && (
							<>
								<h3 className={styles.examplesHeader}>Examples</h3>
								<code className={styles.code}>{exampleTestCases}</code>
							</>
						)}
					</>
				) : (
					'No description provided'
				)}
			</div>
		</div>
	);
};
