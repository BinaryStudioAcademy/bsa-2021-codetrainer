import React, { useEffect, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { Button, FullscreenLoader } from 'components';
import { ButtonsBlock, CreateTaskSettings, ResultTest } from 'components/pages';
import { ButtonClasses } from 'components/basic/button';
import { NotificationType } from 'containers/notification/logic/models';
import { setNotificationState } from 'containers/notification/logic/actions';
import historyHelper from 'helpers/history.helper';
import { useAppSelector } from 'hooks/useAppSelector';
import { WebApi } from 'typings/webapi';
import { NUMBER_OF_RANKS } from 'enum/ranks';
import { ROUTES, TASK_ROUTES } from 'constants/routes';
import { socket } from 'services/socket';
import { IUser } from 'typings/common/IUser';
import { TypeTest } from 'constants/task';
import { SOCKET_EVENTS } from 'constants/socket-constants';
import { ITestResult } from 'containers/task-train/logic/state';
import { InstructionTab, SolutionsTab, TestsTab } from './tabs';
import { challengeSelect, goToValues, insertData, DISCIPLINE_ITEMS } from './data';
import { taskInitialState } from './logic/state';
import { validationTaskField } from './validation/validation';
import * as actions from './logic/actions';

import styles from './create-task.module.scss';

export const CreateTask: React.FC = () => {
	const dispatch = useDispatch();

	const createMessage = ({ message, type }: { message: string; type: NotificationType }) => {
		dispatch(
			setNotificationState({
				state: {
					message,
					notificationType: type,
				},
			}),
		);
	};

	const { task, tasks, errors, success, testResult, isLoading } = useAppSelector(({ createTask }) => createTask);

	useEffect(() => {
		dispatch(actions.loadTasks());
		socket.on(
			SOCKET_EVENTS.TASK_RESULT,
			({ task, ...testResult }: ITestResult & { task: WebApi.Entities.ITask } & { user: IUser }) => {
				dispatch(actions.setTestResult({ testResult }));
				dispatch(actions.setTask({ task }));
			},
		);
	}, []);

	useEffect(() => {
		if (!success) {
			return;
		}
		createMessage({ message: success, type: NotificationType.Success });
		dispatch(actions.success({ success: null }));
	}, [success]);

	useEffect(() => {
		if (!errors) {
			return;
		}
		createMessage({ message: errors, type: NotificationType.Error });
		dispatch(actions.errors({ errors: null }));
	}, [errors]);

	const handleTaskChange = useCallback(
		(id: string | null) => {
			const task: Partial<WebApi.Entities.ITask> | undefined = tasks.find((task) => task.id === id);
			dispatch(actions.setTask({ task: task ?? taskInitialState }));
			dispatch(actions.setTestResult({ testResult: null }));
		},
		[dispatch, tasks],
	);

	const handleChangeFieldTask = useCallback(
		(type: string, value: string | { name: string }[] | boolean) => {
			dispatch(actions.changeTask({ task: { [type]: value } }));
		},
		[dispatch],
	);

	const handleValidateSolution = useCallback(async () => {
		if (!Boolean(task?.id?.length)) {
			handleSaveTask();
			return;
		}
		dispatch(actions.taskValidation({ typeTest: TypeTest.TEST_TASK }));
	}, [task]);

	const handleSaveTask = async () => {
		const validation = await validationTaskField(task);
		if (typeof validation === 'string') {
			createMessage({ message: validation, type: NotificationType.Error });
		} else {
			dispatch(actions.saveTask({ task }));
		}
	};

	const handlePublishTask = () => {
		if (!task.validateSolution) {
			return;
		}
		dispatch(actions.publishTask());
	};

	const handleInsertExample = () => {
		handleTaskChange(null);
		dispatch(actions.changeTask({ task: insertData }));
	};

	const handlePreviewClick = () => {
		historyHelper.push(task.id ? ROUTES.TaskInfo + '/' + task.id + TASK_ROUTES.Train : '');
	};

	const handleGoToChange = (taskId: string | null, actionId: string | null) => {
		switch (actionId) {
			case '1':
				historyHelper.push(taskId ? ROUTES.TaskInfo + '/' + taskId : '');
				break;
			case '2':
				historyHelper.push(taskId ? ROUTES.TaskInfo + '/' + taskId + TASK_ROUTES.Discourse : '');
				break;
			case '3':
				historyHelper.push(taskId ? ROUTES.TaskInfo + '/' + taskId + TASK_ROUTES.Solutions : '');
				break;
			case '4':
				historyHelper.push(taskId ? ROUTES.TaskInfo + '/' + taskId + TASK_ROUTES.Train : '');
				break;
		}
	};

	const handleDeleteTask = () => {
		dispatch(actions.fetchDeleteTask());
	};

	const handleResetTask = () => {
		createMessage({ message: 'You need to press button "save" for save task', type: NotificationType.Success });
		dispatch(actions.setTask({ task: { ...taskInitialState, id: task.id, name: task.name } }));
	};

	const ranks = useMemo(() => {
		const rank = (task?.rank || NUMBER_OF_RANKS).toString();
		return {
			ranks: new Array(NUMBER_OF_RANKS)
				.fill(undefined)
				.map((_, index) => ({ id: (index + 1).toString(), title: (index + 1).toString() }))
				.reverse(),
			rank: { id: rank, title: rank },
		};
	}, [task]);

	const tasksForSelect = useMemo(
		() => [
			challengeSelect,
			...tasks
				.map(({ id = '', name = '' }) => ({ id, title: name }))
				.sort((a, b) => a.title.localeCompare(b.title)),
		],
		[tasks],
	);

	if (isLoading) {
		return <FullscreenLoader />;
	}

	return (
		<div className={styles.createTask}>
			<div className={styles.createTaskBlock}>
				<div className={styles.createTaskRow}>
					<CreateTaskSettings
						{...task}
						{...ranks}
						tags={task.tags?.map((tag) => tag.name)}
						onChange={handleChangeFieldTask}
						disciplineItems={DISCIPLINE_ITEMS}
					/>
					<div className={clsx(styles.taskInstructions, 'taskInstructions')}>
						<ButtonsBlock
							tasks={tasksForSelect}
							taskId={task.id ?? null}
							goToValues={goToValues}
							onPreviewClick={handlePreviewClick}
							onGoToChange={handleGoToChange}
							onTaskChange={handleTaskChange}
						/>
						<InstructionTab description={task?.description} onChange={handleChangeFieldTask} />
						<div className={styles.validationButtons}>
							<Button
								className={clsx(ButtonClasses.blue)}
								disabled={!Boolean(task.id?.length)}
								onClick={handleValidateSolution}
							>
								Validate Solution
							</Button>
							<Button className={clsx(ButtonClasses.blue)} onClick={handleInsertExample}>
								Insert Example
							</Button>
						</div>
					</div>
				</div>
				{testResult && (
					<div className={styles.createTaskTestResult}>
						<ResultTest test={testResult.result} />
					</div>
				)}
				<div className={styles.createTaskRow}>
					<div className={clsx(styles.solution, 'taskSolution')}>
						<SolutionsTab {...task} onChange={handleChangeFieldTask} />
					</div>
					<div className={clsx(styles.tests, 'taskTests')}>
						<TestsTab {...task} onChange={handleChangeFieldTask} />
					</div>
				</div>
			</div>
			<div className={styles.buttonsBottom}>
				{Boolean(task?.validateSolution) ? (
					<Button
						className={clsx(ButtonClasses.red, ButtonClasses.filled)}
						disabled={Boolean(task?.isPublished)}
						id="publishButton"
						onClick={handlePublishTask}
					>
						Publish
					</Button>
				) : null}
				<Button className={clsx(ButtonClasses.red)} onClick={handleSaveTask}>
					Save
				</Button>
				<Button
					disabled={!Boolean(task.id?.length)}
					className={clsx(ButtonClasses.red)}
					onClick={handleResetTask}
				>
					Reset
				</Button>
				<Button
					disabled={!Boolean(task.id?.length)}
					className={clsx(ButtonClasses.red)}
					onClick={handleDeleteTask}
				>
					Delete
				</Button>
			</div>
		</div>
	);
};
