import React from 'react';
import { Tag } from '@blueprintjs/core';

import styles from './rank.module.scss';

interface Props {
    rank: number;
    color: string;
}

const Rank: React.FC<Props> = ({ rank, color }) => {
    return (
        <Tag className={`${styles.tag} ${styles[color]}`}>{rank} rank</Tag>
    );
};

export default Rank;
