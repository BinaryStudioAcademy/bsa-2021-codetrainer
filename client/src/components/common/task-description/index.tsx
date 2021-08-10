import React from 'react';
import styles from './task-description.module.scss';
import { TagsList, Rank } from 'components/basic';
import { ITaskDescriptionProps } from './types';
import { insertStylesInIframe } from '../../../helpers/iframe.helper';

const TaskDescription: React.FC<ITaskDescriptionProps> = ({ rank, title, content, tags }) => {
	return (
		<>
			<p className={styles.taskTitleWrapper}>
				<Rank rank={rank} />
				<h6 className={styles.taskTitle}>{title}</h6>
			</p>
			<div>
				{/* // TODO: replace with markdown */}
				<iframe
					id="taskDescriptionFrame"
					className={styles.iframe}
					srcDoc={content}
					onLoad={() => insertStylesInIframe('taskDescriptionFrame')}
				/>
			</div>
			<TagsList tags={tags} />
		</>
	);
};

export default TaskDescription;
