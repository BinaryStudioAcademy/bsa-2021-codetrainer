import React from 'react';
import styles from './task-description.module.scss';
import { Rank, TagList } from 'components/basic';
import { ITaskDescriptionProps } from './interface';
import { Link } from 'react-router-dom';
import { insertStylesInIframe } from '../../../helpers/iframe.helper';
import { ROUTES } from 'constants/routes';

const TaskDescription: React.FC<ITaskDescriptionProps> = ({ id, rank, name, description, examples, tags }) => {
	const codeExamples = examples
		? `<h6>Examples:</h6>
		<div>
			<code>
			${examples}
			</code>
		</div>`
		: '';

	const content = `
	<div>
		<p>${description}</p>
		${codeExamples}
	</div>`;

	return (
		<>
			<span className={styles.taskTitleWrapper}>
				<Rank rank={rank} />
				<Link className={styles.taskTitle} to={`${ROUTES.TaskInfo}/${id}`}>
					{name}
				</Link>
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
			{tags && <TagList tags={tags} />}
		</>
	);
};

export default TaskDescription;
