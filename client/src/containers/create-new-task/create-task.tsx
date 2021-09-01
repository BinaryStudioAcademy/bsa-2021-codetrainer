import { TaskTabTypes } from 'common';
import { Button, CreateTabs, ICreateTabsProps } from 'components';
import React, { useState } from 'react';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { CreateSettings } from './create-task-settings';
import styles from './create-task.module.scss';
import { ButtonsBlock } from 'components/pages';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import { Discipline, IDisciplineItem } from './logic/models';
import { DISCIPLINE_ITEMS, SELECT_PROPS } from './mock';
import { findDisciplineItem } from './create-task-settings/create-task-settings';
import { ISelectProps, ISelectValue } from 'components/basic/select/interface';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType } from 'containers/notification/logic/models';
import { setNotificationState } from 'containers/notification/logic/actions';
import { setTask } from './logic/actions';
import { IRootState } from 'typings/root-state';
import { createTask, deleteTask, updateTask, getTaskById } from 'services/task/task.service';
import historyHelper from 'helpers/history.helper';
import { addTask, deleteTaskRedux } from 'containers/user/logic/actions';
import { useAppSelector } from 'hooks/useAppSelector';
import { WebApi } from 'typings/webapi';
import { useEffect } from 'react';
import { NUMBER_OF_RANKS } from 'enum/ranks';

export interface ICreateTaskProps {}

const CodeTabs = {
	COMPLETE_SOLUTION: 0,
	INITIAL_SOLUTION: 1,
	preloaded: 2,
};

const TestTabs = {
	TEST_CASES: 0,
	EXAMPLE_TEST_CASES: 1,
};

export const CreateTask = (props: ICreateTaskProps) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);

	const createErrorMessage = (message: string) => {
		dispatch(
			setNotificationState({
				state: {
					message,
					notificationType: NotificationType.Error,
				},
			}),
		);
	};
	const [challengeActiveValue, setChallengeActiveValue] = useState<ISelectValue>({
		id: '0',
		title: 'Switch challenge',
	});
	const yourChallengeIds = useAppSelector((state) => state.auth.userData.user?.tasks);
	const getYourChallengeValues = async (except?: string) => {
		if (!yourChallengeIds) {
			return null;
		}
		let startingArray;
		if (!except) {
			startingArray = yourChallengeIds;
		} else {
			startingArray = yourChallengeIds.filter((task) => task.id !== except);
		}
		const yourChallengeValues = await startingArray.map<Promise<{ id: string | null; title: string }>>(
			async (task: WebApi.Entities.ITask) => {
				const result = await getTaskById(task.id);
				return {
					id: task.id,
					title: result.name,
				};
			},
		);
		return Promise.all(yourChallengeValues).then((res) => {
			return res;
		});
	};
	const [yourChallengeValues, setYourChallengeValues] = useState<{ id: string | null; title: string }[] | null>([
		{
			id: '0',
			title: 'New challenge',
		},
	]);

	//settings block
	const [taskName, setTaskName] = useState('');
	const [chosenDiscipline, setDiscipline] = useState<IDisciplineItem>(DISCIPLINE_ITEMS[0]);
	const onChangeDiscipline = (newDiscipline: Discipline) => {
		const foundDisciplineItem: IDisciplineItem = findDisciplineItem(newDiscipline);
		setDiscipline(foundDisciplineItem);
	};
	const [language, setLanguage] = useState<ISelectValue>(SELECT_PROPS.values[0]);
	const [rank, setRank] = useState('');
	const [tags, setTags] = useState('');
	const [isSelectedSwitch, setSelectedSwitch] = useState(false);
	const onSwitchClick = (newSwitchState: boolean) => {
		setSelectedSwitch(newSwitchState);
	};

	//taskInstructions
	const [instructionTab, setInstructionTab] = useState(0);
	const [textDescription, setTextDescription] = useState('');
	const tabsInstructions: ICreateTabsProps = {
		selectedTab: instructionTab,
		tabs: [
			{
				header: {
					title: 'Description',
				},
				type: TaskTabTypes.TEXT,
				text: textDescription,
				editable: true,
			},
			{
				header: {
					title: 'Preview',
					toolTipTitle: 'Look how your description looks',
					icon: {
						name: faInfo,
					},
				},
				type: TaskTabTypes.MARKDOWN,
				text: textDescription,
				markdownContent: textDescription,
			},
			{
				header: {
					title: 'Help',
					toolTipTitle: <em>comment</em>,
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `# [Read more about markdown](https://guides.hexlet.io/markdown/)`,
			},
		],
		onChange: (text) => setTextDescription(text),
		onSelectTab: (tab) => setInstructionTab(tab),
	};
	//taskSolution
	const [codeTab, setCodeTab] = useState(0);
	const [completeSolution, setCompleteSolution] = useState('');
	const [initialSolution, setInitialSolution] = useState('');
	const [preloaded, setPreloaded] = useState('');
	const tabsCode: ICreateTabsProps = {
		selectedTab: codeTab,
		tabs: [
			{
				header: {
					title: 'Complete Solution',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: completeSolution,
			},
			{
				header: {
					title: 'Initial Solution',
				},
				editable: true,
				type: TaskTabTypes.CODE,
				text: initialSolution,
			},
			{
				header: {
					title: 'Preloaded',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: preloaded,
			},
			{
				header: {
					title: 'Help',
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `### In "Complete Solution" you should solve your own task
### In "Initial Soultion" write code that will be given to the user at the start
### "Preloaded" is optional here. This is code that will be loaded before the solution code within the execution path.
This allows you to setup code that can be used by the warrior's solution, but not directly edited within the solution code.`,
			},
		],
		onChange: (text) => {
			switch (codeTab) {
				case CodeTabs.COMPLETE_SOLUTION:
					setCompleteSolution(text);
					break;
				case CodeTabs.INITIAL_SOLUTION:
					setInitialSolution(text);
					break;
				case CodeTabs.preloaded:
					setPreloaded(text);
					break;
			}
		},
		onSelectTab: (tab) => setCodeTab(tab),
	};
	//taskTests
	const [testTab, setTestTab] = useState(0);
	const [testCases, setTestCases] = useState('');
	const [exampleTestCases, setExampleTestCases] = useState('');
	const tabsTests: ICreateTabsProps = {
		selectedTab: testTab,
		tabs: [
			{
				header: {
					title: 'Test Cases',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: testCases,
			},
			{
				header: {
					title: 'Example Test Cases',
				},
				editable: true,
				type: TaskTabTypes.CODE,
				text: exampleTestCases,
			},
			{
				header: {
					title: 'Help',
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `### "Test Cases" is where you write all hidden tests for the user's solution.
### "Example Test Cases" is where you write all example test for user's solution.

Remember! Your solution in "Complete solution" should pass all these tests too!`,
			},
		],
		onChange: (text) => {
			switch (testTab) {
				case TestTabs.TEST_CASES:
					setTestCases(text);
					break;
				case TestTabs.EXAMPLE_TEST_CASES:
					setExampleTestCases(text);
					break;
			}
		},
		onSelectTab: (tab) => setTestTab(tab),
	};
	const taskId = useSelector((state: IRootState) => state.createTask.taskId);
	const handleSave = async () => {
		const requestBody = {
			name: taskName,
			discipline: chosenDiscipline.value as string,
			// languageId: language.id.toString(),
			rank: Number(rank),
			allowContributors: isSelectedSwitch,
			tags: tags.trim(),
			description: textDescription,
			completeSolution,
			initialSolution,
			testCases,
			exampleTestCases,
			preloaded,
		};
		let task: { error: any; message: string } & WebApi.Entities.ITask;
		if (!taskId) {
			task = await createTask(requestBody);
		} else {
			task = await updateTask(requestBody, taskId);
		}
		if (task.error) {
			createErrorMessage(task.message);
		} else if (!task.error) {
			dispatch(setTask({ taskId: task.id }));
			dispatch(addTask({ task }));
			setChallengeActiveValue({
				id: task.id,
				title: task.name,
			});
			if (yourChallengeValues) {
				const foundChallenge = yourChallengeValues.find((item) => item.id === task.id);
				if (foundChallenge) {
					const newChallenges = yourChallengeValues.map((item) => {
						if (item.id === task.id) {
							return {
								id: item.id,
								title: task.name,
							};
						}
						return item;
					});
					setYourChallengeValues(newChallenges);
				} else {
					setYourChallengeValues([
						...yourChallengeValues,
						{
							id: task.id,
							title: task.name,
						},
					]);
				}
			} else {
				setYourChallengeValues(null);
			}
			setIsEditing(true);
			dispatch(
				setNotificationState({
					state: {
						message: `Task ${taskName} is ${taskId ? 'updated' : 'saved'}`,
						notificationType: NotificationType.Success,
					},
				}),
			);
			return task.id;
		}
		return null;
	};
	const handleReset = () => {
		if (taskId) {
			createErrorMessage('You can`t reset the saved task. Instead create a new one.');
			return;
		}
		resetAllFields();
	};
	const resetAllFields = () => {
		setTaskName('');
		setDiscipline(DISCIPLINE_ITEMS[0]);
		setLanguage(SELECT_PROPS.values[0]);
		setRank('');
		setSelectedSwitch(false);
		setTags('');
		setTextDescription('');
		setCompleteSolution('');
		setInitialSolution('');
		setPreloaded('');
		setTestCases('');
		setExampleTestCases('');
	};
	const handleDelete = async () => {
		if (!taskId) {
			createErrorMessage('You haven`t saved this task yet.');
		} else {
			const result = await deleteTask(taskId);
			if (result.error) {
				createErrorMessage('Something went wrong.');
			} else if (!result.error) {
				dispatch(
					setNotificationState({
						state: {
							message: `Task is deleted.`,
							notificationType: NotificationType.Success,
						},
					}),
				);
				dispatch(deleteTaskRedux({ taskId }));
				getYourChallengeValues(taskId).then((result) => {
					setYourChallengeValues(result ? [{ id: '0', title: 'New challenge' }, ...result] : null);
				});
				setChallengeActiveValue({
					id: '0',
					title: 'Switch challenge',
				});
				resetAllFields();
				setIsEditing(false);
				dispatch(setTask({ taskId: null }));
			}
		}
	};
	const handleValidateSolution = async () => {
		return true;
	};
	const handlePublish = async () => {
		const thisTaskId = await handleSave();
		if (thisTaskId) {
			const result = await handleValidateSolution();
			if (result) {
				const requestBody = {
					name: taskName,
					discipline: chosenDiscipline.value as string,
					// languageId: language.id.toString(),
					rank: Number(rank),
					allowContributors: isSelectedSwitch,
					tags: tags.trim(),
					description: textDescription,
					completeSolution,
					initialSolution,
					testCases,
					exampleTestCases,
					isPublished: true,
					preloaded,
				};
				const requestResult = await updateTask(requestBody, thisTaskId);
				if (!requestResult.error) {
					setIsEditing(false);
					dispatch(
						setNotificationState({
							state: {
								message: `Task ${requestResult.name} is published`,
								notificationType: NotificationType.Success,
							},
						}),
					);
				} else {
					createErrorMessage('Can`t be published');
				}
			} else {
				createErrorMessage('Your solution doesn`t fit the tests.');
			}
		}
	};
	const handleInsertExample = () => {
		setTextDescription(`### In this task you have to find 2 biggest numbers in the array`);
		setCompleteSolution(`function twoOldestAges(ages){
	var oldest = 0, nextOldest;
	for(var i = 0;i < ages.length;i++){
		var age = ages[i];
		if (age > oldest){
			nextOldest = oldest;
			oldest = age;
		}
		else if(age > nextOldest){
			nextOldest = age;
		}
	}
	return [nextOldest, oldest];
	}`);
		setInitialSolution(`//return the two oldest/oldest ages within the array of ages passed in.
// it should return the two ages as a sorted array, youngest age first
function twoOldestAges(ages){
				
}`);
		setPreloaded('');
		setTestCases(`const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;
		
describe("twoOldestAges", function() {
	it("given [1,5,87,45,8,8]", function() {
	assert.deepEqual(twoOldestAges([1, 5, 87, 45, 8, 8]), [45, 87]);
	});

	it("given [6,5,83,5,3,18]", function() {
	assert.deepEqual(twoOldestAges([6, 5, 83, 5, 3, 18]), [18, 83]);
	});
});`);
		setExampleTestCases('');
	};
	const handlePreviewClick = (taskId: string | null) => {
		historyHelper.push(taskId ? '/task/' + taskId : '');
	};
	const handleTaskChange = async (taskId: string | null) => {
		if (taskId) {
			const task = await getTaskById(taskId);
			let tags = '';
			task.tags.forEach((tag: { name: string }) => {
				tags += tag.name + ',';
			});
			const discipline = DISCIPLINE_ITEMS.find((item) => item.value === task.discipline);
			setTaskName(task.name);
			setDiscipline(discipline ? discipline : DISCIPLINE_ITEMS[0]);
			setLanguage(SELECT_PROPS.values[0]);
			setRank(task.rank);
			setSelectedSwitch(task.allowContributors);
			setTags(tags.substr(0, tags.length - 1));
			setTextDescription(task.description);
			setCompleteSolution(task.completeSolution);
			setInitialSolution(task.initialSolution);
			setPreloaded(task.preloaded);
			setTestCases(task.testCases);
			setExampleTestCases(task.exampleTestCases);
		}
	};
	const handleGoToChange = (taskId: string | null, actionId: string | null) => {
		switch (actionId) {
			case '1':
				historyHelper.push(taskId ? '/task/' + taskId : '');
				break;
			case '2':
				historyHelper.push(taskId ? '/task/' + taskId : '');
				break;
			case '3':
				historyHelper.push(taskId ? '/task/' + taskId : '');
				break;
			case '4':
				historyHelper.push(taskId ? '/task/' + taskId : '');
				break;
			case '5':
				historyHelper.push(taskId ? '/task/' + taskId + '/train' : '');
				break;
		}
	};

	useEffect(() => {
		resetAllFields();
		getYourChallengeValues().then((result) =>
			setYourChallengeValues(result ? [{ id: '0', title: 'New challenge' }, ...result] : null),
		);
		if (taskId && isEditing) {
			handleTaskChange(taskId);
		}
	}, []);
	const rankValues: ISelectValue[] = [];
	for (let i = 0; i < NUMBER_OF_RANKS; i++) {
		rankValues.push({
			id: i.toString(),
			title: i.toString(),
		});
	}
	const rankSelectProps: ISelectProps = {
		values: rankValues,
		onChange: (value) => {
			setRank(value.title);
		},
	};
	return (
		<>
			<div className={styles.createTaskBlock}>
				<CreateSettings
					chosenDiscipline={chosenDiscipline}
					onChangeDiscipline={onChangeDiscipline}
					isSelectedSwitch={isSelectedSwitch}
					onSwitchClick={onSwitchClick}
					language={language}
					setLanguage={setLanguage}
					taskName={taskName}
					setTaskName={setTaskName}
					rank={rank}
					setRank={setRank}
					tags={tags}
					setTags={setTags}
					rankSelectProps={rankSelectProps}
				/>
				<div className={clsx(styles.taskInstructions, 'taskInstructions')}>
					<ButtonsBlock
						handlePreviewClick={() => handlePreviewClick(taskId)}
						taskId={taskId}
						yourChallengeValues={yourChallengeValues}
						onChallengeChange={handleTaskChange}
						handleReset={() => {
							resetAllFields();
							dispatch(setTask({ taskId: null }));
						}}
						challengeActiveValue={challengeActiveValue}
						setChallengeActiveValue={setChallengeActiveValue}
						handleGoToChange={handleGoToChange}
					/>
					<CreateTabs {...tabsInstructions} />
					<div className={styles.validationButtons}>
						<Button className={clsx(ButtonClasses.blue)} onClick={handleValidateSolution}>
							Validate Solution
						</Button>
						<Button className={clsx(ButtonClasses.blue)} onClick={handleInsertExample}>
							Insert Example
						</Button>
					</div>
				</div>
				<div className={clsx(styles.solution, 'taskSolution')}>
					<CreateTabs {...tabsCode} />
				</div>
				<div className={clsx(styles.tests, 'taskTests')}>
					<CreateTabs {...tabsTests} />
				</div>
			</div>
			<div className={styles.buttonsBottom}>
				<Button
					className={clsx(ButtonClasses.red, ButtonClasses.filled)}
					id="publishButton"
					onClick={handlePublish}
				>
					Publish
				</Button>
				<Button className={clsx(ButtonClasses.red)} onClick={handleSave}>
					Save
				</Button>
				<Button className={clsx(ButtonClasses.red)} onClick={handleReset}>
					Reset
				</Button>
				<Button className={clsx(ButtonClasses.red)} onClick={handleDelete}>
					Delete
				</Button>
			</div>
		</>
	);
};
