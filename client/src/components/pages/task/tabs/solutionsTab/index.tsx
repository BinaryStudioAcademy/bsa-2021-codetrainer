import { Button } from 'components';
import { ButtonClasses } from 'components/basic/button';
import React from 'react';
import styles from './solutions-tab.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { Description } from './description';
import { TestCases } from './test-cases';
import { WebApi } from 'typings/webapi';
import { Solution } from './solution';
import { Divider } from '@material-ui/core';

export interface ISolutionsTabProps {
	task: WebApi.Entities.IChallenge;
}

export enum ShowMe {
	AllSolutions = 'All solutions',
	SolutionsOfFollowing = 'Solutions of users I am following',
}

export enum SortBy {
	Newest = 'Newest',
	Oldest = 'Oldest',
}

export const SolutionsTab = ({ task }: ISolutionsTabProps) => {
	const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
	const [isTestCasesOpened, setIsTestCasesOpened] = useState(false);
	const [activeShowMe, setActiveShowMe] = useState(ShowMe.AllSolutions);
	const [activeSortBy, setActiveSortBy] = useState(SortBy.Newest);
	const solutions = [
		'fdsafdsafds',
		'lorem ipsum',
		'fkdsa ifundafa',
		' jfldanu oieuafysdaoifnyceopoyfo ofiy y3tf ewwa',
	];

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<div className={styles.showMe}>
					<span className={styles.label}>Show me:</span>
					<button
						onClick={() => setActiveShowMe(ShowMe.AllSolutions)}
						className={clsx(
							activeShowMe === ShowMe.AllSolutions && styles.membersSortPanelButtonActive,
							styles.membersSortPanelButton,
						)}
					>
						{ShowMe.AllSolutions}
					</button>
					<button
						onClick={() => setActiveShowMe(ShowMe.SolutionsOfFollowing)}
						className={clsx(
							activeShowMe === ShowMe.SolutionsOfFollowing && styles.membersSortPanelButtonActive,
							styles.membersSortPanelButton,
						)}
					>
						{ShowMe.SolutionsOfFollowing}
					</button>
				</div>
				<div className={styles.sortBy}>
					<span className={styles.label}>Sort by:</span>
					<button
						onClick={() => setActiveSortBy(SortBy.Newest)}
						className={clsx(
							activeSortBy === SortBy.Newest && styles.membersSortPanelButtonActive,
							styles.membersSortPanelButton,
						)}
					>
						{SortBy.Newest}
					</button>
					<button
						onClick={() => setActiveSortBy(SortBy.Oldest)}
						className={clsx(
							activeSortBy === SortBy.Oldest && styles.membersSortPanelButtonActive,
							styles.membersSortPanelButton,
						)}
					>
						{SortBy.Oldest}
					</button>
				</div>
			</div>
			<div className={styles.toggleBtns}>
				<Button
					onClick={() => setIsDescriptionOpened(!isDescriptionOpened)}
					className={clsx(ButtonClasses.blue, styles.skipButton)}
				>
					Show challenge description
				</Button>
				{isDescriptionOpened &&
					(task.description ? (
						<Description description={task.description} />
					) : (
						<div className={styles.noInfoProvided}>No description provided</div>
					))}
				<Button
					onClick={() => setIsTestCasesOpened(!isTestCasesOpened)}
					className={clsx(ButtonClasses.blue, styles.skipButton)}
				>
					Show challenge test cases
				</Button>
				{isTestCasesOpened &&
					(task.exampleTestCases ? (
						<TestCases testCases={task.exampleTestCases} />
					) : (
						<div className={styles.noInfoProvided}>No examples provided</div>
					))}
			</div>

			<div className={styles.solutions}>
				{solutions.map((item) => {
					return (
						<>
							<Solution solution={item} key={item} />
							<Divider />
						</>
					);
				})}
			</div>
		</div>
	);
};
