import React from 'react';
import styles from './test-cases.module.scss';

export interface ITestCasesProps {
	testCases: string;
}
export const TestCases = ({ testCases }: ITestCasesProps) => {
	return (
		<div className={styles.container}>
			<code>{testCases}</code>
		</div>
	);
};
