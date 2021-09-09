import React from 'react';
import styles from './solution.module.scss';
import PeopleIcon from '@material-ui/icons/People';
import { WebApi } from 'typings/webapi';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import { ThemeType } from 'containers/theme-switcher/logic/models';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useThemeSelector } from 'hooks/useAppSelector';
import { darkTheme, lightTheme } from 'components/common/task-solutions/config';

export interface ISolutionProps {
	solution: WebApi.Entities.ISolution;
}

export const Solution = ({ solution }: ISolutionProps) => {
	const { theme } = useThemeSelector();

	return (
		<div className={styles.solution}>
			<div className={styles.header}>
				<PeopleIcon />
				<Link to={`${ROUTES.Users}/${solution.user.username}`}>
					<h3>
						{solution.user.name} {solution.user.surname}
					</h3>
				</Link>
			</div>
			<div className={styles.code}>
				<SyntaxHighlighter
					language={solution.language}
					style={theme === ThemeType.Light ? lightTheme : darkTheme}
				>
					{solution.code}
				</SyntaxHighlighter>
			</div>
		</div>
	);
};
