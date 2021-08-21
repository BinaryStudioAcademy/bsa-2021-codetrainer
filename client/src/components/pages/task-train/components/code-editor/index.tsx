import React from 'react';
import AceEditor from 'react-ace';
import styles from './code-editor.module.scss';

interface ICodeEditorProps {
	code?: string;
	title?: string;
	onChange?: (value: string) => void;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ title, code, ...props }) => {
	return (
		<div className={styles.codeEditor}>
			{title && (
				<p className={styles.codeEditorTitle}>
					<strong>{title}</strong>
				</p>
			)}
			<AceEditor
				placeholder="Enter your code..."
				mode="javascript"
				theme="tomorrow"
				fontSize={14}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				value={code || ''}
				height="inherit"
				width="95%"
				setOptions={{
					useWorker: false,
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: false,
					enableSnippets: false,
					showLineNumbers: true,
					tabSize: 2,
				}}
				wrapEnabled={true}
				editorProps={{ $blockScrolling: true }}
				{...props}
			/>
		</div>
	);
};

export default CodeEditor;
