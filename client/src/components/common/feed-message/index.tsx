import React from 'react';
import { Text } from '@blueprintjs/core';

import styles from './feed-message.module.scss';

interface Props {
    userImageSource: string;
    userName: string;
    clan: string;
    date: string;
    text: string;
}

const FeedMessage: React.FC<Props> = ({
    userImageSource,
    userName,
    clan,
    date,
    text
}) => {
    return (
        <div>
            <div className={styles.messageUser}>
                <img 
                    className={styles.messageUserImage} 
                    src={userImageSource} 
                    alt="user" 
                />
                <Text tagName="span" className={styles.messageUserName}>{userName}</Text>
                <Text tagName="span" className={styles.messageClanName}>{clan}</Text>
                <Text tagName="span" className={styles.messageDate}>{date}</Text>
            </div>
            
            
            <Text tagName="p">{text}</Text>
        </div>
    );
};

export default FeedMessage;
