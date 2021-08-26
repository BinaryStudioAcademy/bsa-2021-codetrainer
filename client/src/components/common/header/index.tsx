import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import ThemeSwitcher from 'containers/theme-switcher';
import { Avatar } from 'components';
import { TNotification } from 'typings/common/INotification';
import Notification, { mapNotificationToProps } from '../notification';
import styles from './header.module.scss';
import { ReactComponent as BellIcon } from 'assets/icons/bell.svg';
import { Rank } from 'components';
import clsx from 'clsx';

export interface IHeaderProps {
	name: string;
	rank: number;
	honor: number;
	avatar?: string;
	listItems: Array<IListItem>;
	notifications: TNotification[];
	onReadNotification: (id: string) => void;
}

interface IListItem {
	icon: React.ElementType;
	text: string;
	id: string;
	onClick?: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
	const [isListVisible, setListVisibility] = useState(false);
	const [isNotificationsVisible, setNotificationsVisibility] = useState(false);

	const getListItem = ({ icon: Icon, text, id, onClick = () => { } }: IListItem) => {
		return (
			<li
				className={styles.navigationItem}
				key={id}
				onClick={() => {
					onClick();
					setListVisibility(false);
				}}
			>
				<div className={styles.navigationLink}>
					<Icon className={styles.icon} />
					<span>{text}</span>
				</div>
			</li>
		);
	};

	const renderList = (items: IListItem[]) => {
		return <ul className={styles.navigationList}>{items.map((item: IListItem) => getListItem(item))}</ul>;
	};

	const unreadedCounter = props.notifications.filter((notification) => !notification.read).length;

	return (
		<div className={styles.header}>
			<ThemeSwitcher className={styles.themeSwitcher} />
			<ClickAwayListener onClickAway={() => setNotificationsVisibility(false)}>
				<div className={styles.bell} onClick={() => setNotificationsVisibility(!isNotificationsVisible)}>
					<BellIcon width={25} height={25} />
					{unreadedCounter !== 0 ? (
						<div className={styles.bellCounter}>
							<span>{unreadedCounter}</span>
						</div>
					) : null}
					{isNotificationsVisible ? (
						<div className={clsx(styles.notifications, styles.dropdown)}>
							{props.notifications.length !== 0 ? (
								props.notifications.map((notification) => (
									<Notification
										{...mapNotificationToProps(notification)}
										onRead={() => props.onReadNotification(notification.id)}
										key={notification.id}
									/>
								))
							) : (
								<div className={styles.noNotifications}>You do not have any notifications</div>
							)}
						</div>
					) : null}
				</div>
			</ClickAwayListener>
			<span className={styles.name}>{props.name}</span>
			<ClickAwayListener onClickAway={() => setListVisibility(false)}>
				<div className={styles.avatarCover}>
					<div onClick={(e) => {
						e.stopPropagation();
						setListVisibility(!isListVisible)
					}
					}>
						<Avatar avatar={props.avatar} size={61} color="#EC4179" />
					</div>

					{isListVisible && (
						<div className={clsx(styles.navigation, styles.dropdown)}>{renderList(props.listItems)}</div>
					)}
				</div>
			</ClickAwayListener>
			<div className={styles.userMarks}>
				<Rank rank={props.rank} />
				<Rank honor={props.honor} />
			</div>
		</div>
	);
};

export default Header;
