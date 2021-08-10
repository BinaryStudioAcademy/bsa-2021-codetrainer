import React from 'react';
import Tag from 'components/basic/tag';
import { ITagListProps } from './types';
import styles from './tag-list.module.scss';

const TagsList: React.FC<ITagListProps> = ({ tags }) => {
	return (
		<div className={styles.tagsList}>
			{tags.map((tag, index) => (
				<Tag key={index} text={tag} />
			))}
		</div>
	);
};

export default TagsList;
