import React from 'react';
import clsx from 'clsx';
import { Markdown as MarkdownRoot } from 'components';

import stylesParent from '../styles.module.scss';
import styles from './styles.module.scss';

interface IMarkdownProps {
	text?: string;
	className?: string;
}

export const Markdown: React.FC<IMarkdownProps> = ({ text, className }) => {
	return <MarkdownRoot text={text ? text : ''} className={clsx(styles.markdown__body, stylesParent.markdownText)} />;
};
