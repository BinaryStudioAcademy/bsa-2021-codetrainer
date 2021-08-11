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

export const CreateTask = (props: ICreateTaskProps) => {
	const [textDescription, setTextDescription] = useState('');
	const tabsInstructions: ICreateTabsProps = {
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
	};
	const tabsCode: ICreateTabsProps = {
		tabs: [
			{
				header: {
					title: 'Complete Solution',
				},
				type: TaskTabTypes.CODE,
				editable: true,
			},
			{
				header: {
					title: 'Initial Solution',
				},
				editable: true,
				type: TaskTabTypes.CODE,
			},
			{
				header: {
					title: 'Preloaded',
				},
				type: TaskTabTypes.CODE,
				editable: true,
			},
			{
				header: {
					title: 'Help',
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `# Help`,
			},
		],
		onChange: (text) => {},
	};
	const tabsTests: ICreateTabsProps = {
		tabs: [
			{
				header: {
					title: 'Test Cases',
				},
				type: TaskTabTypes.CODE,
				editable: true,
			},
			{
				header: {
					title: 'Example Test Cases',
				},
				editable: true,
				type: TaskTabTypes.CODE,
			},
			{
				header: {
					title: 'Help',
				},
				type: TaskTabTypes.MARKDOWN,
				markdownContent: `# Header`,
			},
		],
		onChange: (text) => {},
	};

	return (
		<>
			<div className={styles.createTaskBlock}>
				<CreateSettings />
				<div className={clsx(styles.taskInstructions, 'taskInstructions')}>
					<ButtonsBlock />
					<CreateTabs {...tabsInstructions} />
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
