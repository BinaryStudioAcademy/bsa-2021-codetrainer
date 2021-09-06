import React from 'react';
import styles from './solution.module.scss';
import PeopleIcon from '@material-ui/icons/People';
import ForumIcon from '@material-ui/icons/Forum';
import { useState } from 'react';
import FeedMessage from 'components/pages/home/components/feed-message';
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
	const [isFeedOpened, setFeedOpened] = useState(false);
	const { theme } = useThemeSelector();

	const user = {
		id: 'fdsalfa',
		// imageSource?: string;
		name: 'name',
		surname: 'surname',
		clan: {
			id: 'fdlsajfdsafdsagda',
			name: 'fiksiki',
		},
	};

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
				<SyntaxHighlighter language="Javascript" style={theme === ThemeType.Light ? lightTheme : darkTheme}>
					{solution.code}
				</SyntaxHighlighter>
			</div>
			<div className={styles.footer}>
				<div onClick={() => setFeedOpened(!isFeedOpened)} className={styles.messagesBtn}>
					<ForumIcon />
					<div>35</div>
				</div>
			</div>
			{isFeedOpened && (
				<div className={styles.messages}>
					{[
						'Awesome solution! ',
						'So clean, readable and clever. Brilliant.',
						"Oh wow, I didn't think to solve the null issue like this. Awesome solution, thanks for teaching me something new.",
					].map((item) => {
						return (
							<FeedMessage
								id={item}
								key={item}
								user={user}
								body={item}
								createdAt={String(solution.createdAt)}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};
