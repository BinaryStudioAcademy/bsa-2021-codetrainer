import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { Rank } from 'components/basic';
import BetaRank from 'components/basic/rank/beta';
import { TTaskSolutions } from 'containers/profile/tabs/solutions/mocks';
import { useThemeSelector } from 'hooks/useAppSelector';
import { ThemeType } from 'containers/theme-switcher/logic/models';
import { ROUTES } from 'constants/routes';
import { TaskStatus } from 'typings/common/task';
import { SolutionStatus } from 'typings/common/solution';
import styles from './task-solutions.module.scss';
import { darkTheme, lightTheme } from './config';

interface ITaskSolutionsProps {
	taskSolutions: TTaskSolutions;
}

function readableLanguageFormat(language: string) {
	switch (language) {
		case 'javascript': {
			return 'JavaScript';
		}
		case 'typescript': {
			return 'TypeScript';
		}
		default: {
			return language[0].toUpperCase() + language.substring(1);
		}
	}
}

const TaskSolutions: FC<ITaskSolutionsProps> = ({ taskSolutions }) => {
	const { theme } = useThemeSelector();
	const { task, solutions } = taskSolutions;

	return (
		<div className={styles.taskSolutions}>
			<div className={styles.task}>
				{task.status === TaskStatus.APPROVED ? <Rank rank={task.rank as number} /> : <BetaRank />}
				<Link to={ROUTES.Home}>{task.name}</Link>
			</div>
			{solutions.map((solution, index) => (
				<div key={index} className={styles.solution}>
					<span className={styles.language}>{readableLanguageFormat(solution.language)}:</span>
					<SyntaxHighlighter
						language={solution.language}
						style={theme === ThemeType.Light ? lightTheme : darkTheme}
					>
						{solution.code}
					</SyntaxHighlighter>
					<div className={styles.actions}>
						<span className={styles.time}>{moment(solution.createdAt).fromNow()}</span>
						{solution.status === SolutionStatus.COMPLETED ? (
							<>
								<Link to={ROUTES.Home}>Refactor</Link>
								<Link to={ROUTES.Home}>Discuss</Link>
							</>
						) : (
							<Link to={ROUTES.Home}>Complete</Link>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export { TaskSolutions };
export { TaskSolutionsSkeleton } from './skeleton';
