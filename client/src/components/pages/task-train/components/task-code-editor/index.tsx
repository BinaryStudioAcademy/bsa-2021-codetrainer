import React from 'react';
import { CodeEditor } from './code-editor';

import styles from './task-code-editor.module.scss';

export enum TypeEditCode {
	CODE = 'code',
	TEST_CASES = 'testCases',
}

interface ITaskCodeEditor {
	code: string;
	testCases: string;
	onChangeCode: (code: string, typeEditor: TypeEditCode) => void;
}

export const TaskCodeEditor: React.FC<ITaskCodeEditor> = ({ code, testCases, onChangeCode }) => {
	return (
		<div className={styles.taskCode}>
			<CodeEditor
				title="Solution"
				onChange={(code: string) => onChangeCode(code, TypeEditCode.CODE)}
				code={code}
			/>
			<CodeEditor
				title="Tests"
				onChange={(code: string) => onChangeCode(code, TypeEditCode.TEST_CASES)}
				code={testCases}
			/>
		</div>
	);
};
