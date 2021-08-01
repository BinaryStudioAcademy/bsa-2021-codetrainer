import React from 'react';
import { Card, Text } from '@blueprintjs/core';
import styles from './feed.module.scss';
import FeedMessage from '../feed-message';
import { Button } from 'components/basic';
import { IFeedProps } from './interface';
import clsx from 'clsx';

const Feed: React.FC<IFeedProps> = ({ messages }) => {
	const tabStyle = clsx(styles.feedCategory, styles.active);

	return (
		<Card className={styles.feed}>
			<div>
				<div className={styles.feedHeader}>
					<Text tagName="h4" className={styles.title}>
						Feed
					</Text>
					<span className={styles.separator}></span>
					<Text tagName="h4" className={tabStyle}>
						All
					</Text>
					<Text tagName="h4" className={styles.feedCategory}>
						Questions
					</Text>
				</div>
				{messages.map((message) => (
					<FeedMessage key={message.id} {...message} />
				))}
			</div>
			<Button text="Load more" classList={styles.loadMoreButton} />
		</Card>
	);
};

export default Feed;
