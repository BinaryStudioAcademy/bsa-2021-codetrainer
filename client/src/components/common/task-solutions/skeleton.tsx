import clsx from 'clsx';
import React, { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import styles from './task-solutions.module.scss';
import { useThemeSelector } from 'hooks/useAppSelector';
import { ThemeType } from 'containers/theme-switcher/logic/models';
import { darkTheme, lightTheme } from './config';

const TaskSolutionsSkeleton: FC = () => {
	const { theme } = useThemeSelector();

	return (
		<div className={clsx(styles.taskSolutions, styles.skeleton)}>
			<div className={styles.task}>
				<span />
				<span />
			</div>
			<div className={styles.solution}>
				<SyntaxHighlighter language="javascript" style={theme === ThemeType.Light ? lightTheme : darkTheme}>
					...
				</SyntaxHighlighter>
				<div className={styles.actions}>
					<span />
					<span />
					<span />
				</div>
			</div>
		</div>
	);
};

export { TaskSolutionsSkeleton };
