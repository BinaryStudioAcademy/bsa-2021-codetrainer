import React from 'react';
import { Card, Text } from '@blueprintjs/core';
import FeedMessage from '../feed-message';

import styles from './feed.module.scss';

interface Message {
    id: string;
    userImageSource: string;
    userName: string;
    clan: string;
    date: string;
    text: string;
}

interface Props {
    messages: Message[];
}

const Feed: React.FC<Props> = ({ messages }) => {
    return (
        <Card className={styles.feed}>
            <div>
                <Text tagName="h4">Feed</Text>
                <Text tagName="h4" className={`${styles.feedCategory} ${styles.active}`}>All</Text>
                <Text tagName="h4" className={styles.feedCategory}>Questions</Text>
                {messages.map(message => <FeedMessage key={message.id} {...message} />)}
            </div>
        </Card>
    );
};

export default Feed;
