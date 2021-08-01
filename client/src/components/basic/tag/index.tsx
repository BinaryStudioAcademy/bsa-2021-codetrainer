import React from 'react';
import styles from './tag.module.scss';
import { ITagProps } from './interface';

const Tag: React.FC<ITagProps> = ({ text }) => {
	return <span className={styles.wrapper}>{text}</span>;
};

export default Tag;
