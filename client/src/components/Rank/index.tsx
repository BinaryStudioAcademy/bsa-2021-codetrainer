import React from 'react'

import styles from './rank.module.scss';

import { IRank } from './interface';

const Rank:React.FC<IRank> = ({ rankNumber }) => {
  const rankStyle = [styles.blueRank, styles.orangeRank, styles.redRank]

  return (
    <span className={[styles.rank, rankStyle[Math.floor((rankNumber - 1) / 3)]].join(' ')}>
      {rankNumber} rank
    </span>
  )
}

export default Rank;