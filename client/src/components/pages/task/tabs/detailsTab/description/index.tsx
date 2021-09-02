import { Markdown } from 'components/common';
import React from 'react';
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
						<Markdown text={description} />
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
