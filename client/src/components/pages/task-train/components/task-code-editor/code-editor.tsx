import React, { useState } from 'react';
import clsx from 'clsx';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { CodeEditor as Editor } from 'components';

import styles from './task-code-editor.module.scss';

interface ITaskCodeEditor {
	code: string;
	title: string;
	onChange: (code: string) => void;
}

export const CodeEditor: React.FC<ITaskCodeEditor> = ({ code, title, onChange }) => {
	const [fullScreen, setFullScreen] = useState<boolean>(false);
	const handleClickZoom = () => setFullScreen((state) => !state);
	return (
		<div className={clsx(styles.taskCodeEditor, { [styles.taskCodeFullScreen]: fullScreen })}>
			<div className={styles.taskCodeTitle}>
				<p className={styles.taskCodeTitle}>{title}</p>
				<ZoomOutMapIcon className={styles.taskCodeZoom} onClick={handleClickZoom} />
			</div>
			<div className={styles.taskCodeInner}>
				<Editor editable={true} code={code} onChange={(code: string) => onChange(code)} />
			</div>
		</div>
	);
};
