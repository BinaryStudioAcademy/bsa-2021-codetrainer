import React from 'react';
import clsx from 'clsx';
import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MarkdownHighlighterSettings } from 'common';

import styles from './styles.module.scss';

interface IMarkdownProps {
	text?: string;
	className?: string;
}

const Components: ReactMarkdownOptions['components'] = {
	code({ inline, className, children, ...props }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			<SyntaxHighlighter
				style={vs}
				language={match[1]}
				PreTag="div"
				children={String(children).replace(/\n$/, '')}
				showLineNumbers={MarkdownHighlighterSettings.SHOW_LINE_NUMBER}
				wrapLongLines={MarkdownHighlighterSettings.WRAP_LONG_LINES}
			/>
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
};

export const Markdown: React.FC<IMarkdownProps> = ({ text, className }) => {
	return (
		<div className={clsx(styles.markdown__body, className)}>
			<ReactMarkdown children={text ? text : ''} components={Components} />
		</div>
	);
};
