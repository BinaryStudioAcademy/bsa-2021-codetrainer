import React from 'react';
import { Card, Text } from '@blueprintjs/core';

import styles from './feed.module.scss';

import FeedMessage from '../feed-message';
import { Button } from 'components/basic';

interface IMessage {
	id: string;
	userImageSource: string;
	userName: string;
	clan: string;
	date: string;
	text: string;
}

interface IFeedProps {
	messages: IMessage[];
}

const Feed: React.FC<IFeedProps> = ({ messages }) => {
	return (
		<Card className={styles.feed}>
			<div>
				<div className={styles.feedHeader}>
					<Text tagName="h4" className={styles.title}>
						Feed
					</Text>
					<span className={styles.separator}></span>
					<Text tagName="h4" className={`${styles.feedCategory} ${styles.active}`}>
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
