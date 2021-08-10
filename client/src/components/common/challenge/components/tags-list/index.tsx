import React from 'react';
import Tag from './tag';
import { ITagsListProps } from './types';
import styles from './tags-list.module.scss';

const TagsList: React.FC<ITagsListProps> = ({ tags }) => {
	return (
		<div className={styles.challengeTagsList}>
			{tags.map((tag: string, index: number) => (
				<Tag text={tag} key={index} />
			))}
		</div>
	);
};

export default TagsList;
