import React, { useState } from 'react';
import { Avatar, Label } from 'components';
import bellIcon from 'assets/icons/header/bell.svg';
import { IHeaderProps, IListItem } from './types';
import styles from './header.module.scss';

const Header: React.FC<IHeaderProps> = ({ notificationCounter, name, avatar, rank, mark, listItems }) => {
	const [isListVisible, setListVisibility] = useState(false);

	const changeVisible = () => {
		setListVisibility(!isListVisible);
	};

	const getListItem = (item: IListItem) => (
		<li className={styles.navigationItem} key={item.id}>
			<div className={styles.navigationLink}>
				<img src={item.image} alt="Icon" />
				<span>{item.text}</span>
			</div>
		</li>
	);

	const renderList = (items: IListItem[]) => (
		<ul className={styles.navigationList}>{items.map((item: IListItem) => getListItem(item))}</ul>
	);

	return (
		<div className={styles.header}>
			<div className={styles.bell}>
				<img src={bellIcon} alt="Icon" />
				<div className={styles.bellCounter}>
					<span>{notificationCounter}</span>
				</div>
			</div>
			<span className={styles.name}>{name}</span>
			<div className={styles.avatarCover}>
				<div onClick={changeVisible}>
					<Avatar avatar={avatar} size={61} color="#EC4179" />
				</div>

				{isListVisible && <div className={styles.navigation}>{renderList(listItems)}</div>}
			</div>
			<Label label={rank + ' rank'} color="#EC4179" />
			<Label label={mark} color="#EC4179" />
		</div>
	);
};

export default Header;
