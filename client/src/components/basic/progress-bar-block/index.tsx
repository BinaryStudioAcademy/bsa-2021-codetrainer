import React from 'react';
import { ProgressBar } from '@blueprintjs/core';
import styles from './progress-bar-block.module.scss';
import './progress-bar.scss';

interface IProgressBarBlockProps {
	name: string;
	done: number | null;
	left: number;
}

const ProgressBarBlock: React.FC<IProgressBarBlockProps> = (props) => {
	const { name, done, left } = props;

	return (
		<div className={styles.progressBarBlock}>
			<div className={styles.progressBarInfo}>
				<p className={styles.progressName}>{name}</p>
				<p className={styles.progressInfoDone}>
					<span className={styles.progressDone}>{done}</span>
					{left === 0 ? null : <span className={styles.progressOfSymbol}>/</span>}
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
