import React from 'react';
import styles from './solution.module.scss';
import PeopleIcon from '@material-ui/icons/People';
import ForumIcon from '@material-ui/icons/Forum';
import { useState } from 'react';
import FeedMessage from 'components/pages/home/components/feed-message';
import { WebApi } from 'typings/webapi';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';

export interface ISolutionProps {
	solution: WebApi.Entities.ISolution;
}

export const Solution = ({ solution }: ISolutionProps) => {
	const [isFeedOpened, setFeedOpened] = useState(false);
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
				<code>{solution.code}</code>
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
