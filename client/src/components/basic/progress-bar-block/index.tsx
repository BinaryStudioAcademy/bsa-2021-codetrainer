import React from 'react';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import styles from './progress-bar-block.module.scss';
import { IProgressBarBlockProps } from './types';
import honorStyles from 'components/pages/profile/profile-info/tabs/stats/honor-breakdown/honor-breakdown.module.scss';

const ProgressBarBlock: React.FC<IProgressBarBlockProps> = ({ name, done, left }) => {
	return (
		<div className={clsx(honorStyles.progressBarBlock, styles.progressBarBlock)}>
			<div className={styles.progressInfo}>
				<p className={styles.progressInfoName}>{name}</p>

				<p className={styles.progressInfoValue}>
					<span className={styles.progressInfoDone}>{done}</span>
					{left !== 0 && <span className={styles.progressInfoSymbol}>/</span>}
					<span className={styles.progresInfosLeft}>{left}</span>
				</p>
			</div>

			<LinearProgress
				variant="determinate"
				classes={{ root: styles.progressBar, bar1Determinate: styles.progressBarDone }}
				value={done ? done / left : 0}
			/>
		</div>
	);
};

export default ProgressBarBlock;
