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
import { useEffect } from 'react';

export interface ISolutionsTabProps {
	task: WebApi.Entities.IChallenge;
	filterSolutionsByFollowing: (solutions: WebApi.Entities.ISolution[]) => WebApi.Entities.ISolution[];
	filterNewest: (solutions: WebApi.Entities.ISolution[]) => WebApi.Entities.ISolution[];
	filterOldest: (solutions: WebApi.Entities.ISolution[]) => WebApi.Entities.ISolution[];
	isLocked?: boolean;
	unlockSolutions: () => void;
	solutions: WebApi.Entities.ISolution[];
}

export enum ShowMe {
	AllSolutions = 'All solutions',
	SolutionsOfFollowing = 'Solutions of users I am following',
}

export enum SortBy {
	Newest = 'Newest',
	Oldest = 'Oldest',
}

export const SolutionsTab = ({
	task,
	filterSolutionsByFollowing,
	filterNewest,
	filterOldest,
	unlockSolutions,
	solutions,
	isLocked,
}: ISolutionsTabProps) => {
	const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
	const [isTestCasesOpened, setIsTestCasesOpened] = useState(false);
	const [activeShowMe, setActiveShowMe] = useState(ShowMe.AllSolutions);
	const [activeSortBy, setActiveSortBy] = useState(SortBy.Newest);
	const [solutionsToShow, setSolutionsToShow] = useState(task.solutions);
	const [isAuthorSolutionOpened, setIsAuthorSolutionOpened] = useState(false);

	useEffect(() => {
		setSolutionsToShow(filterNewest(solutions));
	}, [task.solutions]);

	return (
		<div className={styles.container}>
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

			{!isLocked ? (
				<>
					{solutions.length ? (
						<>
							<Button
								onClick={() => setIsAuthorSolutionOpened(!isAuthorSolutionOpened)}
								className={clsx(ButtonClasses.blue, styles.skipButton, styles.showAuthorSolutionBtn)}
							>
								Show author&apos;s solution
							</Button>
							{isAuthorSolutionOpened && (
								<div className={styles.authorSolution}>
									<code>{task.completeSolution ? task.completeSolution : 'No solution given'}</code>
								</div>
							)}
							<div className={styles.filters}>
								<div className={styles.showMe}>
									<span className={styles.label}>Show me:</span>
									<button
										onClick={() => {
											setActiveShowMe(ShowMe.AllSolutions);
											setSolutionsToShow(solutions);
										}}
										className={clsx(
											activeShowMe === ShowMe.AllSolutions && styles.membersSortPanelButtonActive,
											styles.membersSortPanelButton,
										)}
									>
										{ShowMe.AllSolutions}
									</button>
									<button
										onClick={() => {
											setActiveShowMe(ShowMe.SolutionsOfFollowing);
											setSolutionsToShow(filterSolutionsByFollowing(solutionsToShow));
										}}
										className={clsx(
											activeShowMe === ShowMe.SolutionsOfFollowing &&
												styles.membersSortPanelButtonActive,
											styles.membersSortPanelButton,
										)}
									>
										{ShowMe.SolutionsOfFollowing}
									</button>
								</div>
								<div className={styles.sortBy}>
									<span className={styles.label}>Sort by:</span>
									<button
										onClick={() => {
											setActiveSortBy(SortBy.Newest);
											setSolutionsToShow(filterNewest(solutionsToShow));
										}}
										className={clsx(
											activeSortBy === SortBy.Newest && styles.membersSortPanelButtonActive,
											styles.membersSortPanelButton,
										)}
									>
										{SortBy.Newest}
									</button>
									<button
										onClick={() => {
											setActiveSortBy(SortBy.Oldest);
											setSolutionsToShow(filterOldest(solutionsToShow));
										}}
										className={clsx(
											activeSortBy === SortBy.Oldest && styles.membersSortPanelButtonActive,
											styles.membersSortPanelButton,
										)}
									>
										{SortBy.Oldest}
									</button>
								</div>
							</div>

							<div className={styles.solutions}>
								{solutionsToShow.map((item) => {
									return (
										<>
											<Solution solution={item} key={item.id} />
											<Divider />
										</>
									);
								})}
							</div>
						</>
					) : (
						<>
							<Button
								onClick={() => setIsAuthorSolutionOpened(!isAuthorSolutionOpened)}
								className={clsx(ButtonClasses.blue, styles.skipButton, styles.showAuthorSolutionBtn)}
							>
								Show author&apos;s solution
							</Button>
							{isAuthorSolutionOpened && (
								<div className={styles.authorSolution}>
									<code>{task.completeSolution ? task.completeSolution : 'No solution given'}</code>
								</div>
							)}
						</>
					)}
				</>
			) : (
				<>
					<div className={styles.lockedSolutionsText}>
						Since you have not yet solved this challenge we have hidden the solutions from you. If you
						choose to view the solutions you will forfeit your eligibility to earn honor/rank progress for
						this challenge.
					</div>
					<Button
						onClick={() => {
							unlockSolutions();
						}}
						className={clsx(ButtonClasses.red, ButtonClasses.filled, styles.unlockSolutionBtn)}
					>
						Unlock Solutions
					</Button>
				</>
			)}
		</div>
	);
};
