import { TaskTabTypes } from 'common';
import { Button, CreateTabs, ICreateTabsProps } from 'components';
import React, { useState } from 'react';
import { CreateSettings } from './create-task-settings';
import styles from './create-task.module.scss';
import { ButtonsBlock } from 'components/pages';
import './create-task.scss';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';
import { Discipline, IDisciplineItem } from './logic/models';
import { DISCIPLINE_ITEMS, SELECT_PROPS } from './mock';
import { findDisciplineItem } from './create-task-settings/create-task-settings';
import { ISelectValue } from 'components/basic/select/interface';
import { NotificationContainer } from 'containers/notification';
import { useDispatch } from 'react-redux';
import { NotificationType } from 'containers/notification/logic/models';
import { http } from 'services';
import { setNotificationState } from 'containers/notification/logic/actions';

export interface ICreateTaskProps {}

const CodeTabs = {
	COMPLETE_SOLUTION: 0,
	INITIAL_SOLUTION: 1,
	PRELOADED: 2,
};

const TestTabs = {
	TEST_CASES: 0,
	EXAMPLE_TEST_CASES: 1,
};

export const CreateTask = (props: ICreateTaskProps) => {
	const dispatch = useDispatch();
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
	//settings block
	const [taskName, setTaskName] = useState('');
	const [chosenDiscipline, setDiscipline] = useState<IDisciplineItem>(DISCIPLINE_ITEMS[0]);
	const onChangeDiscipline = (newDiscipline: Discipline) => {
		const foundDisciplineItem: IDisciplineItem = findDisciplineItem(newDiscipline);
		setDiscipline(foundDisciplineItem);
	};
	const [language, setLanguage] = useState<ISelectValue>(SELECT_PROPS.values[0]);
	const [rank, setRank] = useState('8');
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
						name: 'help',
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
				markdownContent: `# Header`,
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
				markdownContent: `# Help`,
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
				case CodeTabs.PRELOADED:
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
				markdownContent: `# Header`,
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
	//validation
	let validationStatus = true; //true is okay ,false if there are mistakes
	const handleSave = async () => {
		validationStatus = true;
		if (taskName.trim() === '') {
			validationStatus = false;
			createErrorMessage('Task name can`t be empty.');
		}
		if (rank.trim().length > 1 || Number(rank.trim()) > 8 || Number(rank.trim()) < 1) {
			validationStatus = false;
			createErrorMessage('Rank must be a number from 1 to 8.');
		}
		if (!Object.values(Discipline).includes(chosenDiscipline.value)) {
			validationStatus = false;
			createErrorMessage('You`ve chosen wronk discipline.');
		}
		if (textDescription.trim() === '') {
			validationStatus = false;
			createErrorMessage('Description can`t be empty.');
		}
		if (completeSolution.trim() === '') {
			validationStatus = false;
			createErrorMessage('Complete Solution can`t be empty.');
		}
		if (initialSolution.trim() === '') {
			validationStatus = false;
			createErrorMessage('Initial Solution can`t be empty.');
		}
		if (testCases.trim() === '') {
			validationStatus = false;
			createErrorMessage('Test Cases tab can`t be empty.');
		}
		if (exampleTestCases.trim() === '') {
			validationStatus = false;
			createErrorMessage('Example Test Cases tab can`t be empty.');
		}
		if (validationStatus) {
			const requestBody = {
				name: taskName,
				discipline: chosenDiscipline.value,
				languageId: language.id,
				rank: Number(rank),
				allowContributors: isSelectedSwitch,
				tags: tags.trim(),
				description: textDescription,
				completeSolution,
				initialSolution,
				testCases,
				exampleTestCases,
			};
			const result = await http.callWebApi({
				endpoint: 'task',
				method: 'POST',
				skipAuthorization: false,
				body: requestBody,
			});
			if (result) {
				dispatch(
					setNotificationState({
						state: {
							message: `Task ${taskName} is saved`,
							notificationType: NotificationType.Success,
						},
					}),
				);
			}
			console.log(requestBody);
			console.log(result);
		}
	};
	const handleReset = () => {
		// 	completeSolution,
		// 	initialSolution,
		// 	testCases,
		// 	exampleTestCases,
		setTaskName('');
		setDiscipline(DISCIPLINE_ITEMS[0]);
		setLanguage(SELECT_PROPS.values[0]);
		setRank('8');
		setSelectedSwitch(false);
		setTags('');
		setTextDescription('');
		setCompleteSolution('');
		setInitialSolution('');
		setTestCases('');
		setExampleTestCases('');
	};
	return (
		<>
			<NotificationContainer />
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
				/>
				<div className={clsx(styles.taskInstructions, 'taskInstructions')}>
					<ButtonsBlock />
					<CreateTabs {...tabsInstructions} />
					<div className={styles.validationButtons}>
						<Button className={clsx(ButtonClasses.blue)}>Validate Solution</Button>
						<Button className={clsx(ButtonClasses.blue)}>Insert Example</Button>
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
				<Button className={clsx(ButtonClasses.red, ButtonClasses.filled)}>Publish</Button>
				<Button className={clsx(ButtonClasses.red)} onClick={handleSave}>
					Save
				</Button>
				<Button className={clsx(ButtonClasses.red)} onClick={handleReset}>
					Reset
				</Button>
				<Button className={clsx(ButtonClasses.red)}>Delete</Button>
			</div>
		</>
	);
};
