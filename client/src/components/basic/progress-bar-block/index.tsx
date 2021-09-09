import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import styles from './progress-bar-block.module.scss';
import honorStyles from 'components/pages/profile/profile-info/tabs/stats/honor-breakdown/honor-breakdown.module.scss';
import clsx from 'clsx';

interface IProgressBarBlockProps {
	name: string;
	done: number | null;
	left: number;
}

const StyledProgressBar = withStyles((theme) => ({
	root: {
		height: 5,
		borderRadius: '5px',
	},
	colorPrimary: {
		backgroundColor: '#F0F3F9',
	},
	bar: {
		borderRadius: '5px',
		backgroundColor: '#EC4179',
	},
}))(LinearProgress);

const ProgressBarBlock: React.FC<IProgressBarBlockProps> = (props) => {
	const { name, done, left } = props;

	return (
		<div className={clsx(honorStyles.progressBarBlock, styles.progressBarBlock)}>
			<div className={styles.progressBarInfo}>
				<p className={styles.progressName}>{name}</p>
				<p className={styles.progressInfoDone}>
					<span className={styles.progressDone}>{done}</span>
					{left !== 0 && <span className={styles.progressOfSymbol}>/</span>}
					{left !== 0 && <span className={styles.progressLeft}>{left}</span>}
				</p>
			</div>
			<StyledProgressBar variant="determinate" value={done ? (done / left) * 100 : 0} />
		</div>
	);
};

export default ProgressBarBlock;
