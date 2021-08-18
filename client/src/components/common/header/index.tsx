import React, { useState, useCallback } from 'react';
import { Avatar, Label } from 'components';
import styles from './header.module.scss';
import bellImg from 'assets/icons/header/bell.svg';
import { TNotification } from 'typings/common/INotification';
import Notification, { mapNotificationToProps } from '../notification';

export interface IHeaderProps {
	name: string;
	rank: number;
	notifications: TNotification[];
	mark: number;
	avatar?: string;
	listItems: Array<IListItem>;
	onReadNotification: (id: string) => void;
}

interface IListItem {
	image: string;
	text: string;
	id: string;
	onClick?: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
	const [isListVisible, setListVisibility] = useState(false);
	const [isNotificationsVisible, setNotificationsVisibility] = useState(false);

	const changeVisible = () => {
		setListVisibility(!isListVisible);
		setNotificationsVisibility(false);
	};

	const toggleNotificationsVisibility = useCallback(() => {
		setNotificationsVisibility(!isNotificationsVisible);
		setListVisibility(false);
	}, [isNotificationsVisible]);

	const getListItem = ({ image, text, id, onClick = () => {} }: IListItem) => {
		return (
			<li
				className={styles.navigationItem}
				key={id}
				onClick={() => {
					onClick();
					changeVisible();
				}}
			>
				<div className={styles.navigationLink}>
					<img src={image} alt="listItem" />
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
			<div className={styles.bell} onClick={toggleNotificationsVisibility}>
				<img src={bellImg} alt="bell" />
				{unreadedCounter !== 0 ? (
					<div className={styles.bellCounter}>
						<span>{unreadedCounter}</span>
					</div>
				) : null}
				{isNotificationsVisible ? (
					<div className={styles.notifications}>
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
			<span className={styles.name}>{props.name}</span>
			<div className={styles.avatarCover}>
				<div onClick={changeVisible}>
					<Avatar avatar={props.avatar} size={61} color="#EC4179" />
				</div>

				{isListVisible && <div className={styles.navigation}>{renderList(props.listItems)}</div>}
			</div>
			<Label label={props.rank + ' rank'} color="#EC4179" />
			<Label label={props.mark} color="#EC4179" />
		</div>
	);
};

export default Header;
