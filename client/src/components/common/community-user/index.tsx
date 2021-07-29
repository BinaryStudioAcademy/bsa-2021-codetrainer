import React from 'react';
import { Text } from '@blueprintjs/core';

import styles from './community-user.module.scss';
import Rank from '../rank';

interface Props {
    rank: number;
    imageSource: string;
    name: string;
}

const CommunityUser: React.FC<Props> = ({ imageSource, name, rank }) => {
    let rankColor = 'blue';
    switch(rank) {
        case 1:
        case 2:
        case 3:
            rankColor = 'blue';
            break;
        case 4:
        case 5:
        case 6:
            rankColor = 'yellow';
            break;
        case 7:
        case 8:
        case 9:
            rankColor = 'red';
            break;
    };

    return (
        <div className={styles.userRow}>
            <Rank rank={rank} color={rankColor} />
            <img className={styles.userImage} src={imageSource} alt={name}/>
            <Text>{name}</Text>
        </div>
    )
}

export default CommunityUser;
