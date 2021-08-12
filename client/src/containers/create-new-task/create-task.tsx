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
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';
import { http } from 'services';

export interface ICreateTaskProps {}

export const CreateTask = (props: ICreateTaskProps) => {
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
	//settings block
	const [chosenDiscipline, setDiscipline] = useState<IDisciplineItem>(DISCIPLINE_ITEMS[0]);
	const onChangeDiscipline = (newDiscipline: Discipline) => {
		const foundDisciplineItem: IDisciplineItem = findDisciplineItem(newDiscipline);
		setDiscipline(foundDisciplineItem);
	};
	const [isSelectedSwitch, setSelectedSwitch] = useState(false);
	const onSwitchClick = (newSwitchState: boolean) => {
		setSelectedSwitch(newSwitchState);
	};
	const [language, setLanguage] = useState<ISelectValue>(SELECT_PROPS.values[0]);
	const [taskName, setTaskName] = useState('');
	const [rank, setRank] = useState('8');
	const [tags, setTags] = useState('');

	const dispatch = useDispatch();
	const createErrorMessage = (message: string) => {
		dispatch(
			setNotificationState({
				notificationType: NotificationType.Error,
				message,
			}),
		);
	};
	//taskInstructions
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
	let validationStatus = true; //true is okay ,false if there are mistakes
	const createNewTask = async () => {
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
		if (validationStatus) {
			const requestBody = {
				name: taskName,
				discipline: chosenDiscipline.value,
				languageId: language.id,
				rank: Number(rank),
				allowContributors: isSelectedSwitch,
				tags: tags.split(',').map((tag) => tag.trim()),
				description: textDescription,
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
						notificationType: NotificationType.Success,
						message: `Task ${taskName} is saved`,
					}),
				);
			}
			console.log(requestBody);
			console.log(result);
		}
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
				<Button className={clsx(ButtonClasses.red)} onClick={createNewTask}>
					Save
				</Button>
				<Button className={clsx(ButtonClasses.red)}>Reset</Button>
				<Button className={clsx(ButtonClasses.red)}>Delete</Button>
			</div>
		</>
	);
};
