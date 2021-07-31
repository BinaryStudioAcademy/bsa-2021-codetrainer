import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { Ace } from 'ace-builds';
import { config } from 'ace-builds';
import { ITabProps } from '../types';
import { CreateCodeData } from 'common';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/');
config.setModuleUrl(
	'ace/mode/javascript_worker',
	'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-javascript.js',
);

export const CreateCode: React.FC<ITabProps> = ({ onChange, text, editable }) => {
	const [editor, setEditor] = useState<Ace.Editor | null>(null);
	const [value, setValue] = useState<string>(text);
	const handleChange = (newValue: string) => {
		setValue(newValue);
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
				height: '100%',
				width: '100%',
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
			value={value}
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
