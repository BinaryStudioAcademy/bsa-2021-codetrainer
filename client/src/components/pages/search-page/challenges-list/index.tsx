import React from 'react';
import { IChallenge } from 'components/common/challenge/types';
import { Challenge } from 'components';
import styles from './challenges-list.module.scss';

const ChallengesList: React.FC<{ challenges: IChallenge[] }> = ({ challenges }) => {
    return (
        <div>
            <p className={styles.challengesAmount}>
                {challenges.length} {String(challenges.length).slice(-1) === '1' ? 'challenge' : 'challenges'} found.
            </p>
            {challenges.map((challenge) => (
                <Challenge key={challenge.id} {...challenge} />
            ))}
        </div>
    );
};

export default ChallengesList;