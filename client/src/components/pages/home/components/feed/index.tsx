import React from 'react';
import clsx from 'clsx';
import { Button } from 'components/basic';
import { ButtonClasses } from 'components/basic/button';
import { IFeedProps } from './interface';
import FeedMessage from '../feed-message';

import styles from './feed.module.scss';

const Feed: React.FC<IFeedProps> = (props) => {
	const { onClick, messages, selectedFeedCategory, onSelectFeedCategory, isLastPage } = props;
	const feedCategories = ['All'];

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

	return (
		<div className={styles.feed}>
			<div>
				<div className={styles.feedHeader}>
					<h4 className={styles.title}>Feed</h4>
					<span className={styles.separator}></span>
					{feedCategoriesJSX}
				</div>
				{messages ? feedContentJSX : 'No messages yet'}
			</div>
			{!isLastPage ? (
				<div className={styles.wrapperButton}>
					<Button className={clsx(ButtonClasses.red, styles.loadMoreButton)} onClick={onClick}>
						Load more
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default Feed;
