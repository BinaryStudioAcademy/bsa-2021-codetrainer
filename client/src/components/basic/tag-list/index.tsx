import React from 'react';
import Tag from 'components/basic/tag';
import styles from './tag-list.module.scss';
import { ITagListProps } from './interface';

const TagList: React.FC<ITagListProps> = ({ tags }) => {
	return (
		<div className={styles.tagWrappers}>
			{tags.map((tag, index) => (
				<Tag key={index} text={tag} />
			))}
		</div>
	);
};

export default TagList;
