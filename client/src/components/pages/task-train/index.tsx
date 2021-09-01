import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { ButtonClasses } from 'components/basic/button';
import { Button } from 'components';
import { Select } from 'components/basic';
import { WebApi } from 'typings/webapi';
import { LanguageVersion, TypeTest } from 'constants/task';
import { SolutionStatus } from 'typings/common/solution';
import { ROUTES, TASK_ROUTES } from 'constants/routes';
import { ITestResult } from 'containers/task-train/logic/state';

import { ResetModal, Instruction, ResultTest } from './components';
import { TaskCodeEditor, TypeEditCode } from './components/task-code-editor';

import styles from './task-train.module.scss';

interface ITaskTrainPageProps {
	task: WebApi.Entities.IChallenge;
	solution: WebApi.Entities.ISolution | null;
	result: ITestResult['result'];
	success: boolean;
	activeTab: number;
	onChangeTab: (tab: number) => void;
	onSubmit: (code: string, test: string, typeTest: TypeTest) => void;
	onReset: (reset: boolean) => void;
	onPatch: (code: string, testCases: string, status: SolutionStatus) => void;
}

const TaskTrainPage: React.FC<ITaskTrainPageProps> = (props) => {
	const { task, solution, success, onSubmit, onReset, onPatch } = props;
	const [codes, setCodes] = useState<{ [key in TypeEditCode]: string }>({
		code: solution?.code || task?.initialSolution || '',
		testCases: solution?.testCases || task.exampleTestCases || '',
	});
	const [modalResetOpen, setModalResetOpen] = useState<boolean>(false);
	const [languageVersion, setLanguageVersion] = useState<{ title: string; id: string | null }>(LanguageVersion[0]);
	const history = useHistory();

	const handleChangeCode = useCallback((code: string, typeEditCode: TypeEditCode) => {
		setCodes((state) => ({ ...state, [typeEditCode]: code }));
	}, []);

	return (
		<div className={styles.taskContainer}>
			<Instruction {...props} result={<ResultTest test={props.result} />} />
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
				<TaskCodeEditor onChangeCode={handleChangeCode} code={codes.code} testCases={codes.testCases} />
				<div className={styles.taskPanel}>
					<div className={styles.taskPanelLeft}>
						<Button
							className={ButtonClasses.blue}
							disabled={solution?.status === SolutionStatus.UNLOCKED}
							onClick={() => onPatch(codes.code, codes.testCases, SolutionStatus.SKIPPED)}
						>
							Skip
						</Button>
						<Button
							className={ButtonClasses.blue}
							disabled={solution?.status === SolutionStatus.UNLOCKED}
							onClick={() => onPatch(codes.code, codes.testCases, SolutionStatus.UNLOCKED)}
						>
							Unlock solution
						</Button>
						<Button
							className={ButtonClasses.blue}
							onClick={() => history.push(`${ROUTES.TaskInfo}/${task.id}${TASK_ROUTES.Discourse}`)}
						>
							Discuss
						</Button>
						<Button className={ButtonClasses.blue} onClick={() => setModalResetOpen(true)}>
							Reset
						</Button>
					</div>
					<div className={styles.taskPanelRight}>
						<Button
							className={ButtonClasses.red}
							disabled={success}
							onClick={() => onSubmit(codes.code, codes.testCases, TypeTest.TEST_SOLUTION)}
						>
							Test
						</Button>
						<Button
							className={clsx(ButtonClasses.red, ButtonClasses.filled)}
							disabled={success}
							onClick={() => onSubmit(codes.code, codes.testCases, TypeTest.TEST_SOLUTION_ATTEMPT)}
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
