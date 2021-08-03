import React from 'react';
import { Card, Text } from '@blueprintjs/core';
import styles from './feed.module.scss';
import FeedMessage from '../feed-message';
import { Button } from 'components/basic';
import { IFeedProps } from './interface';
import clsx from 'clsx';

const Feed: React.FC<IFeedProps> = ({ messages, selectedFeedCategory, onSelectFeedCategory, isLastPage }) => {
	const feedCategories = ['All', 'Questions'];

	const feedCategoriesJSX = feedCategories.map((category) => {
		const className = clsx({ [styles.feedCategory]: true }, { [styles.active]: category === selectedFeedCategory });

		const handleSelectFeedCategory = () => {
			onSelectFeedCategory(category);
		};

		return (
			<Text key={category} tagName="h4" className={className} onClick={handleSelectFeedCategory}>
				{category}
			</Text>
		);
	});

	let feedContentJSX = null;
	switch (selectedFeedCategory) {
		case 'All':
			feedContentJSX = messages.map((message) => <FeedMessage key={message.id} {...message} />);
			break;
		case 'Questions':
			feedContentJSX = 'questions';
			break;
	}

	const loadMoreButton = <Button text="Load more" classList={styles.loadMoreButton} />;

	return (
		<Card className={styles.feed}>
			<div>
				<div className={styles.feedHeader}>
					<Text tagName="h4" className={styles.title}>
						Feed
					</Text>
					<span className={styles.separator}></span>
					{feedCategoriesJSX}
				</div>
				{feedContentJSX}
			</div>
			{!isLastPage ? loadMoreButton : null}
		</Card>
	);
};

export default Feed;
