import { TaskTabTypes } from 'common';
import { Button, CreateTabs, ICreateTabsProps } from 'components';
import React, { useState } from 'react';
import { CreateSettings } from './create-task-settings';
import styles from './create-task.module.scss';
import { ButtonsBlock } from 'components/pages';
import './create-task.scss';
import clsx from 'clsx';
import { ButtonClasses } from 'components/basic/button';

export interface ICreateTaskProps {}

const CodeTabs = {
	COMPLETE_SOLUTION: 0,
	INITIAL_SOLUTION: 1,
	PRELOADED: 2
};

const TestTabs = {
	TEST_CASES: 0,
	EXAMPLE_TEST_CASES: 1
};

export const CreateTask = (props: ICreateTaskProps) => {
	const [instructionTab, setInstructionTab] = useState(0);
	const [codeTab, setCodeTab] = useState(0);
	const [testTab, setTestTab] = useState(0);

	const [textDescription, setTextDescription] = useState('');

	const [completeSolution, setCompleteSolution] = useState('');
	const [initialSolution, setInitialSolution] = useState('');
	const [preloaded, setPreloaded] = useState('');

	const [testCases, setTestCases] = useState('');
	const [exampleTestCases, setExampleTestCases] = useState('');

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
		onSelectTab: (tab) => setInstructionTab(tab)
	};
	const tabsCode: ICreateTabsProps = {
		selectedTab: codeTab,
		tabs: [
			{
				header: {
					title: 'Complete Solution',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: completeSolution
			},
			{
				header: {
					title: 'Initial Solution',
				},
				editable: true,
				type: TaskTabTypes.CODE,
				text: initialSolution
			},
			{
				header: {
					title: 'Preloaded',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: preloaded
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
			switch(codeTab) {
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
		onSelectTab: (tab) => setCodeTab(tab)
	};
	const tabsTests: ICreateTabsProps = {
		selectedTab: testTab,
		tabs: [
			{
				header: {
					title: 'Test Cases',
				},
				type: TaskTabTypes.CODE,
				editable: true,
				text: testCases
			},
			{
				header: {
					title: 'Example Test Cases',
				},
				editable: true,
				type: TaskTabTypes.CODE,
				text: exampleTestCases
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
			switch(testTab) {
				case TestTabs.TEST_CASES:
					setTestCases(text);
					break;
				case TestTabs.EXAMPLE_TEST_CASES:
					setExampleTestCases(text);
					break;
			}
		},
		onSelectTab: (tab) => setTestTab(tab)
	};

	return (
		<>
			<div className={styles.createTaskBlock}>
				<CreateSettings />
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
				<Button className={clsx(ButtonClasses.red)}>Save</Button>
				<Button className={clsx(ButtonClasses.red)}>Reset</Button>
				<Button className={clsx(ButtonClasses.red)}>Delete</Button>
			</div>
		</>
	);
};
