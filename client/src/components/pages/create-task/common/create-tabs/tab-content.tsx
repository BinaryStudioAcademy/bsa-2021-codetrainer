import React, { useState } from 'react';
import { TaskTabTypes } from 'common';
import { CreateText } from './create-text';
import { CreateCode } from './create-code';
import { Markdown } from './markdown';

interface IProps {
	tab: {
		type: TaskTabTypes;
		editable?: boolean;
		markdownContent?: string;
		text?: string;
	};
	onChange: (text: string) => void;
}

export const TabContent: React.FC<IProps> = ({ tab, onChange }) => {
	const [value, setValue] = useState<string>(tab.text || '');
	const handleChange = (newValue: string) => {
		setValue(newValue);
		onChange(newValue);
	};

	switch (tab.type) {
		case TaskTabTypes.TEXT:
			return <CreateText onChange={handleChange} value={value} editable={tab.editable} />;
		case TaskTabTypes.MARKDOWN:
			return <Markdown text={tab.markdownContent || ''} />;
		case TaskTabTypes.PREVIEW:
			return <Markdown text={value} />;
		case TaskTabTypes.CODE:
			return <CreateCode onChange={handleChange} value={value} editable={tab.editable} />;
		default:
			return null;
	}
};
