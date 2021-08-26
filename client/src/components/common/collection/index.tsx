import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { mean } from 'lodash';
import { Tooltip } from '@material-ui/core';
import { WebApi } from 'typings/webapi';
import { ROUTES } from 'constants/routes';
import { Rank } from 'components/basic';
import styles from './collection.module.scss';
import { ReactComponent as DefaultCollectionIcon } from 'assets/icons/collection.svg';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskStatus } from 'typings/common/task';

interface ICollectionProps {
	collection: WebApi.Entities.ICollection;
}

const avatarProps = {
	className: styles.avatar,
	width: 50,
	height: 50,
};

const Collection: FC<ICollectionProps> = ({ collection }) => {
	const averageRank = Math.round(
		mean(collection.tasks.filter((task) => task.status === TaskStatus.APPROVED).map((task) => task.rank)),
	);

	return (
		<div className={styles.collection}>
			{collection.avatar ? (
				<img {...avatarProps} src={collection.avatar} />
			) : (
				<DefaultCollectionIcon {...avatarProps} />
			)}
			<div className={styles.name}>
				{averageRank ? <Rank rank={averageRank} /> : null}
				<Link to={`${ROUTES.Collections}/${collection.id}`}>{collection.name}</Link>
			</div>
			<div className={styles.minor}>
				<Tooltip
					arrow
					placement="bottom"
					title={
						<div className={styles.popover}>
							{collection.tasks ? (
								<>
									Collection includes:
									<ul>
										{collection.tasks.map((task) => (
											<li key={task.id}>{task.name}</li>
										))}
									</ul>
								</>
							) : (
								'Collection is empty'
							)}
						</div>
					}
				>
					<span>
						<FontAwesomeIcon icon={faExchangeAlt} size="lg" />
						{collection.tasks.length}
					</span>
				</Tooltip>
				<Link to={`${ROUTES.Users}/${collection.author.username}`}>
					<FontAwesomeIcon icon={faUser} size="lg" />
					{collection.author.username}
				</Link>
				<Tooltip
					arrow
					placement="bottom"
					title={<span className={styles.popover}>{collection.updatedAt ? 'Updated at' : 'Created at'}</span>}
				>
					<span>
						<FontAwesomeIcon icon={faCalendar} size="lg" />
						{moment(collection.updatedAt || collection.createdAt).fromNow()}
					</span>
				</Tooltip>
			</div>
		</div>
	);
};

export { Collection };
export { default as CollectionSkeleton } from './skeleton';
