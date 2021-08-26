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
						<p>{description}</p>
						{exampleTestCases && (
							<>
								<h3 className={styles.examplesHeader}>Examples</h3>
								<code className={styles.code}>Lorem ipsum dolor sit amet,</code>
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
