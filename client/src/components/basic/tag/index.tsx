import React from 'react';
import { ITagProps } from './types';
import styles from './tag.module.scss';

const Tag: React.FC<ITagProps> = ({ text }) => {
	return <span className={styles.tag}>{text}</span>;
};

export default Tag;
