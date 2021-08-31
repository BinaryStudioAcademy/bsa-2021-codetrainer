import { Button } from 'components';
import { ButtonClasses } from 'components/basic/button';
import React from 'react';
import styles from './solutions-tab.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { Description } from './description';
import { TestCases } from './test-cases';
import { WebApi } from 'typings/webapi';

export interface ISolutionsTabProps {
	task: WebApi.Entities.IChallenge;
}

export const SolutionsTab = ({ task }: ISolutionsTabProps) => {
	const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
	const [isTestCasesOpened, setIsTestCasesOpened] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<div className={styles.showMe}>
					<span className={styles.label}>Show me:</span>
					<button className={clsx(styles.membersSortPanelButtonActive, styles.membersSortPanelButton)}>
						All solutions
					</button>
					<button className={clsx(styles.membersSortPanelButton)}>Solutions of users I am following</button>
				</div>
				<div className={styles.sortBy}>
					<span className={styles.label}>Sort by:</span>
					<button className={clsx(styles.membersSortPanelButtonActive, styles.membersSortPanelButton)}>
						Newest
					</button>
					<button className={clsx(styles.membersSortPanelButton)}>Oldest</button>
				</div>
			</div>
			<div className={styles.toggleBtns}>
				<Button
					onClick={() => setIsDescriptionOpened(!isDescriptionOpened)}
					className={clsx(ButtonClasses.blue, styles.skipButton)}
				>
					Show challenge description
				</Button>
				{isDescriptionOpened && <Description />}
				<Button
					onClick={() => setIsTestCasesOpened(!isTestCasesOpened)}
					className={clsx(ButtonClasses.blue, styles.skipButton)}
				>
					Show challenge test cases
				</Button>
				{isTestCasesOpened && <TestCases />}
			</div>
		</div>
	);
};
