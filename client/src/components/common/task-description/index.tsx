import React from 'react';
import styles from './task-description.module.scss';
import { Rank } from 'components/basic';
import { ITaskDescriptionProps } from './interface';
import { insertStylesInIframe } from '../../../helpers/iframe.helper';

const TaskDescription: React.FC<ITaskDescriptionProps> = ({ rank, name, description, examples, tags }) => {

	const codeExamples = examples ?
		`<h6>Examples:</h6>
		<div>
			<code>
			${examples}
			</code>
		</div>` : '';

	const content = `
	<div>
		<p>${description}</p>
		${codeExamples}
	</div>`;

	return (
		<>
			<span className={styles.taskTitleWrapper}>
				<Rank rank={rank} />
				<h6 className={styles.taskTitle}>{name}</h6>
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
			{/*{tags && <TagList tags={tags} />}*/}
		</>
	);
};

export default TaskDescription;
