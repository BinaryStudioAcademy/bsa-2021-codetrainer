import React from 'react';
import ReactMarkdown, { TransformOptions } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import styles from './styles.module.scss';

interface IProps {
	text: string;
}

const Components: TransformOptions['components'] = {
	code({ node, inline, className, children, ...props }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			<SyntaxHighlighter
				style={docco}
				language={match[1]}
				PreTag="div"
				children={String(children).replace(/\n$/, '')}
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
