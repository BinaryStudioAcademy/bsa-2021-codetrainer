import React from 'react';
import { Rank, Tabs, Markdown, TagList } from 'components';
import { WebApi } from 'typings/webapi';
import TaskStatistic from 'components/common/challenge/challenge-stats';

import styles from './instruction.module.scss';

interface IInstructionProps {
	task: WebApi.Entities.IChallenge;
	result: JSX.Element;
	activeTab: number;
	onChangeTab: (tab: number) => void;
}

export const Instruction: React.FC<IInstructionProps> = ({ task, result, activeTab, onChangeTab }) => {
	return (
		<div className={styles.taskInstructionsContainer}>
			<div className={styles.taskInstructionsHeader}>
				<Rank rank={task.rank} />
				<h1 className={styles.taskInstructionsTitle}>{task.name}</h1>
			</div>
			<div className={styles.taskInstructionsContent}>
				<div className="taskInstructions">
					<Tabs
						tabs={[
							{
								name: 'Instruction',
								content: (
									<div>
										<Markdown text={task.description} className={styles.markdown} />
									</div>
								),
							},
							{
								name: 'Output',
								content: result,
							},
						]}
						activeTabIndex={activeTab}
						onChange={onChangeTab}
					/>
				</div>
				<TagList tags={task.tags.map((tag) => tag.name)} />
				<TaskStatistic
					stats={{
						favoriteSaves: task.savedToFavorites,
						positiveFeedback: task.positiveFeedback,
						author: {
							firstName: task?.user?.name || '',
							lastName: task?.user?.surname || '',
							username: task.user?.username || '',
						},
					}}
				/>
			</div>
		</div>
	);
};
