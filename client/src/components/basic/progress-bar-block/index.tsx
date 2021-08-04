import React from 'react';
import { ProgressBar } from '@blueprintjs/core';
import styles from './progress-bar-block.module.scss';
import honorStyles from 'components/pages/profile/profile-info/tabs/stats/honor-breakdown/honor-breakdown.module.scss';
import './progress-bar.scss';
import clsx from 'clsx';

interface IProgressBarBlockProps {
	name: string;
	done: number | null;
	left: number;
}

const ProgressBarBlock: React.FC<IProgressBarBlockProps> = (props) => {
	const { name, done, left } = props;

	return (
		<div className={clsx(honorStyles.progressBarBlock, styles.progressBarBlock)}>
			<div className={styles.progressBarInfo}>
				<p className={styles.progressName}>{name}</p>
				<p className={styles.progressInfoDone}>
					<span className={styles.progressDone}>{done}</span>
					{left !== 0 && <span className={styles.progressOfSymbol}>/</span>}
					<span className={styles.progressLeft}>{left}</span>
				</p>
			</div>
			<ProgressBar
				animate={false}
				stripes={false}
				className={styles.progressBar}
				value={done ? done / left : 0}
			/>
		</div>
	);
};

export default ProgressBarBlock;
