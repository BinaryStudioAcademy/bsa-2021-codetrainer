import React, { useState } from 'react';
import { Ace, config } from 'ace-builds';
import AceEditor from 'react-ace';
import { CreateCodeData } from 'common';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/');

export interface ICodeEditor {
	onChange: (text: string) => void;
	code?: string;
	editable?: boolean;
}

export const CodeEditor: React.FC<ICodeEditor> = ({ onChange, code, editable }) => {
	const [editor, setEditor] = useState<Ace.Editor | null>(null);
	const handleChange = (newValue: string) => {
		onChange(newValue);
	};

	const handleLoadEditor = (editorInstance: Ace.Editor) => {
		setEditor(editorInstance);
	};

	const handleFocus = () => {
		if (!editor) {
			return;
		}
		editor.resize();
	};

	return (
		<AceEditor
			onFocus={handleFocus}
			style={{
				height: '330px',
				width: '100%',
				background: 'var(--secondary-container-color)',
			}}
			readOnly={!Boolean(editable)}
			onLoad={handleLoadEditor}
			placeholder={CreateCodeData.PLACE_HOLDER}
			mode={CreateCodeData.MODE}
			theme={CreateCodeData.THEME}
			name={CreateCodeData.NAME}
			onChange={handleChange}
			fontSize={CreateCodeData.FONT_SIZE}
			showPrintMargin={CreateCodeData.SHOW_PRINT_MARGIN}
			showGutter={CreateCodeData.SHOW_GUTTER}
			highlightActiveLine={CreateCodeData.HIGHLIGH_ACTIVE_LINE}
			value={code}
			wrapEnabled={CreateCodeData.WRAP_ENABLED}
			setOptions={{
				highlightGutterLine: CreateCodeData.HIGHLIGH_GUTTER_LINE,
				enableBasicAutocompletion: CreateCodeData.ENABLE_BASIC_AUTOCOMPLETION,
				enableLiveAutocompletion: CreateCodeData.ENABLE_LIVE_AUTOCOMPLETION,
				enableSnippets: CreateCodeData.ENABLE_SNIPPETS,
				showLineNumbers: CreateCodeData.SHOW_LINE_NUMBER,
				useWorker: CreateCodeData.USE_WORKER,
				tabSize: CreateCodeData.TAB_SIZE,
			}}
		/>
	);
};
