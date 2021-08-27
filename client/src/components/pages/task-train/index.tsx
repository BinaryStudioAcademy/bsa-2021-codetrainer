import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import { Button, Rank, TagList } from 'components';
import { Select } from 'components/basic';
import { WebApi } from 'typings/webapi';
import { Markdown } from 'components/pages';
import { ROUTES } from 'constants/routes';
import { LanguageVersion, TypeTest } from 'constants/task';
import TaskStatistic from 'components/common/challenge/challenge-stats';
import { ResetModal } from './components/reset-modal';
import CodeEditor from '../../common/code-editor';
import { SolutionStatus } from 'typings/common/solution';
import Tabs from '../../common/tabs';

import styles from './task-train.module.scss';

interface ITaskTrainPageProps {
	task: WebApi.Entities.IChallenge;
	solution: WebApi.Entities.ISolution | null;
	result: string;
	success: boolean;
	activeTab: number;
	onChangeTab: (tab: number) => void;
	onSubmit: (code: string, test: string, type: TypeTest) => void;
	onReset: (reset: boolean) => void;
	onPatch: (type: SolutionStatus) => void;
}

const TaskTrainPage: React.FC<ITaskTrainPageProps> = (props) => {
	const { task, solution, result, success, activeTab, onChangeTab, onSubmit, onReset, onPatch } = props;
	const [code, setCode] = useState<string>(solution?.code || task.preloaded || '');
	const [testCase, setTestCase] = useState<string>(solution?.testCases || task.exampleTestCases || '');
	const [modalResetOpen, setModalResetOpen] = useState<boolean>(false);
	const [languageVersion, setLanguageVersion] = useState<{ title: string; id: string | null }>(LanguageVersion[0]);

	useEffect(() => {
		setCode((state) => solution?.code || state);
	}, [solution]);

	return (
		<div className={styles.taskContainer}>
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
											<Markdown text={task.description} />
											<TagList tags={task.tags.map((tag) => tag.name)} />
										</div>
									),
								},
								{
									name: 'Output',
									content: <Markdown text={result} />,
								},
							]}
							activeTabIndex={activeTab}
							onChange={onChangeTab}
						/>
					</div>
					<TaskStatistic
						stats={{
							favoriteSaves: task.savedToFavorites,
							positiveFeedback: task.positiveFeedback,
							author: {
								firstName: task?.user?.name || '',
								lastName: task?.user?.surname || '',
								link: `${ROUTES.Users}/${task.user?.username}`,
							},
						}}
					/>
				</div>
			</div>
			<div className={styles.taskWorkspaceContainer}>
				<div>
					<span>Select language version:</span>
					<div className={styles.taskLanguageSelect}>
						<Select
							activeValue={languageVersion}
							onChange={(value) => setLanguageVersion(value)}
							values={LanguageVersion}
						/>
					</div>
				</div>
				<div className={styles.taskSolution}>
					<CodeEditor title="Solution" code={code} onChange={(value: string) => setCode(value)} />
				</div>
				<div className={styles.taskTests}>
					<CodeEditor title="Tests" code={testCase} onChange={(value: string) => setTestCase(value)} />
				</div>
				<div className={styles.taskPanel}>
					<div className={styles.taskPanelLeft}>
						<Button
							className={ButtonClasses.blue}
							disabled={solution?.status === SolutionStatus.UNLOCKED}
							onClick={() => onPatch(SolutionStatus.SKIPPED)}
						>
							Skip
						</Button>
						<Button
							className={ButtonClasses.blue}
							disabled={solution?.status === SolutionStatus.UNLOCKED}
							onClick={() => onPatch(SolutionStatus.UNLOCKED)}
						>
							Unlock solution
						</Button>
						<Button className={ButtonClasses.blue}>Discuss</Button>
						<Button className={ButtonClasses.blue} onClick={() => setModalResetOpen(true)}>
							Reset
						</Button>
					</div>
					<div className={styles.taskPanelRight}>
						<Button
							className={ButtonClasses.red}
							disabled={success}
							onClick={() => onSubmit(code, testCase, TypeTest.TEST_SOLUTION)}
						>
							Test
						</Button>
						<Button
							className={clsx(ButtonClasses.red, ButtonClasses.filled)}
							disabled={success}
							onClick={() => onSubmit(code, testCase, TypeTest.TEST_SOLUTION_ATTEMPT)}
						>
							Attempt
						</Button>
					</div>
				</div>
			</div>
			{modalResetOpen && (
				<ResetModal
					isOpen={modalResetOpen}
					setIsOpen={(isOpen: boolean) => setModalResetOpen(isOpen)}
					onClick={onReset}
				/>
			)}
		</div>
	);
};

export default TaskTrainPage;
