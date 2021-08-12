import React from 'react';
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
	const handleChange = (newValue: string) => {
		onChange(newValue);
	};

	switch (tab.type) {
		case TaskTabTypes.TEXT:
			return <CreateText onChange={handleChange} editable={tab.editable} />;
		case TaskTabTypes.MARKDOWN:
			return <Markdown text={tab.markdownContent || ''} />;
		case TaskTabTypes.PREVIEW:
			return <Markdown />;
		case TaskTabTypes.CODE:
			return <CreateCode onChange={handleChange} editable={tab.editable} />;
		default:
			return null;
	}
};
