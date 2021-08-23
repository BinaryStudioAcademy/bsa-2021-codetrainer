import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './rank.module.scss';

const BetaRank: FC = () => <span className={clsx(styles.rank, styles.beta)}>BETA</span>;

export default BetaRank;
