import React from 'react';
import styles from './feed.module.scss';
import FeedMessage from '../feed-message';
import { Button } from 'components/basic';
import { IFeedProps } from './interface';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';

const Feed: React.FC<IFeedProps> = ({ messages, selectedFeedCategory, onSelectFeedCategory, isLastPage }) => {
	const feedCategories = ['All', 'Questions'];

	const feedCategoriesJSX = feedCategories.map((category) => {
		const className = clsx({ [styles.feedCategory]: true }, { [styles.active]: category === selectedFeedCategory });

		const handleSelectFeedCategory = () => {
			onSelectFeedCategory(category);
		};

		return (
			<h4 key={category} className={className} onClick={handleSelectFeedCategory}>
				{category}
			</h4>
		);
	});

	let feedContentJSX = null;
	switch (selectedFeedCategory) {
		case 'All':
			feedContentJSX = messages?.map((message) => <FeedMessage key={message.id} {...message} />);
			break;
		case 'Questions':
			feedContentJSX = 'questions';
			break;
	}

	const loadMoreButton = <Button className={clsx(ButtonClasses.red, styles.loadMoreButton)}>Load more</Button>;

	return (
		<div className={styles.feed}>
			<div>
				<div className={styles.feedHeader}>
					<h4 className={styles.title}>Feed</h4>
					<span className={styles.separator}></span>
					{feedCategoriesJSX}
				</div>
				{feedContentJSX}
			</div>
			{!isLastPage ? loadMoreButton : null}
		</div>
	);
};

export default Feed;
