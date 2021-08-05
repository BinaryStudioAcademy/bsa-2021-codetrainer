import React from 'react';
import styles from './task-description.module.scss';
import { TagList, Rank } from 'components/basic';
import { ITaskDescriptionProps } from './interface';
import { insertStylesInIframe } from '../../../helpers/iframe.helper';

const TaskDescription: React.FC<ITaskDescriptionProps> = ({ rank, title, content, tags }) => {
	return (
		<>
			<span className={styles.taskTitleWrapper}>
				<Rank rank={rank} />
				<h6 className={styles.taskTitle}>{title}</h6>
			</span>
			<div>
				{/* // TODO: replace with markdown */}
				<iframe
					id="taskDescriptionFrame"
					className={styles.iframe}
					srcDoc={content}
					onLoad={() => insertStylesInIframe('taskDescriptionFrame')}
				/>
			</div>
			<TagList tags={tags} />
		</>
	);
};

export default TaskDescription;
