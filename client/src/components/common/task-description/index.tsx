import React from 'react';
import { Link } from 'react-router-dom';
import { Rank, TagList } from 'components/basic';
import { Markdown } from 'components';
import { ROUTES } from 'constants/routes';
import { ITaskDescriptionProps } from './interface';

import styles from './task-description.module.scss';

const TaskDescription: React.FC<ITaskDescriptionProps> = ({ id, rank, name, description, examples, tags }) => {
	return (
		<>
			<span className={styles.taskTitleWrapper}>
				<Rank rank={rank} />
				<Link className={styles.taskTitle} to={`${ROUTES.TaskInfo}/${id}`}>
					{name}
				</Link>
			</span>
			<div className={styles.taskContainer}>
				<Markdown text={typeof description === 'string' ? description : ''} />
			</div>
			{tags && <TagList tags={tags} />}
		</>
	);
};

export default TaskDescription;
