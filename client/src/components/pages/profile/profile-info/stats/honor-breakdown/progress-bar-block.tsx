import React from 'react';
import { ProgressBar } from '@blueprintjs/core';
import '../stats.scss';
import './honor-breakdown.scss';

interface IProgressBarBlock {
	name: string;
	done: number | null;
	left: number;
}

const ProgressBarBlock: React.FC<IProgressBarBlock> = (props) => {
	const { name, done, left } = props;

	return (
		<div className="progress-bar-block">
			<div className="progress-bar-info">
				<p className="progress-name">{name}</p>
				<p className="progress-info-done">
					<span id="progress-done">{done}</span>
					{left === 0 ? null : <span id="progress-of-symbol">/</span>}
					<span id="progress-left">{left}</span>
				</p>
			</div>
			<ProgressBar animate={false} stripes={false} className="progress-bar" value={done ? done / left : 0} />
		</div>
	);
};

export default ProgressBarBlock;
