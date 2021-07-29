import React from 'react';

import styles from './tag.module.scss';

import { ITag } from './interface';

const Tag: React.FC<ITag> = ({ text }) => {
	return <span className={styles.wrapper}>{text}</span>;
};

export default Tag;
