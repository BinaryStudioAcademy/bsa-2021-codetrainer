import React from 'react';
import { ButtonClasses } from 'components/basic/button';
import { Button, Rank, TagList } from 'components';
import Tabs from '../../common/tabs';
import TaskStatistic from './components/task-statistic';
import CodeEditor from '../../common/code-editor';
import styles from './task-train.module.scss';
import { Select } from 'components/basic';
import { useState } from 'react';
import { WebApi } from 'typings/webapi';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';

interface ITaskTrainPageProps {
	task: WebApi.Entities.ITask;
	solution: WebApi.Entities.ISolution | null;
	onSubmit: (code: string) => void;
}

const TaskTrainPage: React.FC<ITaskTrainPageProps> = ({ task, solution, onSubmit }) => {
	const [code, setCode] = useState<string>(task.preloaded || solution?.code || '');
	const [languageVersion, setLanguageVersion] = useState<{ title: string; id: string | null }>({
		title: 'Option 1',
		id: '1',
	});

	const onReset = () => {
		setCode(task.preloaded || solution?.code || '');
	};

	useEffect(() => {
		setCode((state) => solution?.code || state);
	}, [solution]);

	return (
		<div className={styles.taskContainer}>
			<div className={styles.taskInstructionsContainer}>
				<div className={styles.taskInstructionsHeader}>
					<Rank rank={3} />
					<h1 className={styles.taskInstructionsTitle}>{task.name}</h1>
				</div>
				<div className="taskInstructions">
					<Tabs
						tabs={[
							{
								name: 'Instruction',
								content: (
									<div>
										<ReactMarkdown>{task.description}</ReactMarkdown>
										<TagList tags={task.tags.map((tag) => tag.name)} />
									</div>
								),
							},
							{
								name: 'Output',
								content: (
									<div>
										<ReactMarkdown>{task.discipline}</ReactMarkdown>
										<TagList tags={task.tags.map((tag) => tag.name)} />
									</div>
								),
							},
						]}
					/>
				</div>
				<TaskStatistic
					statistic={{
						favourites: 1,
						positiveFeedback: 1,
						author: {
							name: task.user.name,
							surname: task.user.surname,
						},
					}}
				/>
			</div>
			<div className="taskWorkspace">
				<div>
					<span>Select language version:</span>
					<div className={styles.taskLanguageSelect}>
						<Select
							activeValue={languageVersion}
							onChange={(value) => setLanguageVersion(value)}
							values={[
								{ title: 'Option 1', id: '1' },
								{ title: 'Option 2', id: '2' },
							]}
						/>
					</div>
				</div>
				<div className={styles.taskSolution}>
					<CodeEditor
						title="Solution"
						code={code}
						onChange={(value: string) => {
							setCode(value);
						}}
					/>
				</div>
				<div className={styles.taskTests}>
					<CodeEditor title="Tests" code={task.exampleTestCases} />
				</div>
				<div className={styles.taskPanel}>
					<div className={styles.taskPanelLeft}>
						<Button className={ButtonClasses.blue}>Skip</Button>
						<Button className={ButtonClasses.blue}>Unlock solution</Button>
						<Button className={ButtonClasses.blue}>Discuss</Button>
						<Button className={ButtonClasses.blue} onClick={onReset}>
							Reset
						</Button>
					</div>

					<div className={styles.taskPanelRight}>
						<Button className={ButtonClasses.red} onClick={() => onSubmit(code)}>
							Attempt
						</Button>
						<Button className={ButtonClasses.red}>Test</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskTrainPage;
