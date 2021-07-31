import React from 'react';
import ReactMarkdown, { TransformOptions } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MarkdownHighlighterSettings } from 'common';

import styles from './styles.module.scss';

interface IProps {
	text: string;
}

const Components: TransformOptions['components'] = {
	code({ node, inline, className, children, ...props }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			<SyntaxHighlighter
				style={prism}
				language={match[1]}
				PreTag="div"
				children={String(children).replace(/\n$/, '')}
				showLineNumbers={MarkdownHighlighterSettings.SHOW_LINE_NUMBER}
				wrapLongLines={MarkdownHighlighterSettings.WRAP_LONG_LINES}
				{...props}
			/>
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
};

export const Markdown: React.FC<IProps> = ({ text }) => {
	return (
		<div className={styles.markdown__body}>
			<ReactMarkdown children={text} components={Components} />
		</div>
	);
};
