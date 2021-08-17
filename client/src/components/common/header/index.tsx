import React, { useState } from 'react';
import { Avatar, Label } from 'components';
import styles from './header.module.scss';
import bellImg from 'assets/icons/header/bell.svg';
import { Rank } from 'components/basic';
import ThemeSwitcher from '../theme-switcher';

export interface IHeaderProps {
	name: string;
	rank: number;
	notificationCounter: number;
	mark: number;
	avatar?: string;
	listItems: Array<IListItem>;
}

interface IListItem {
	image: string;
	text: string;
	id: string;
	onClick?: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
	const [isListVisible, setListVisibility] = useState(false);

	const changeVisible = () => {
		setListVisibility(!isListVisible);
	};

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

	return (
		<div className={styles.header}>
			<ThemeSwitcher />
			<div className={styles.bell}>
				<img src={bellImg} alt="bell" />
				<div className={styles.bellCounter}>
					<span>{props.notificationCounter}</span>
				</div>
			</div>
			<span className={styles.name}>{props.name}</span>
			<div className={styles.avatarCover}>
				<div onClick={changeVisible}>
					<Avatar avatar={props.avatar} size={61} color="#EC4179" />
				</div>

				{isListVisible && <div className={styles.navigation}>{renderList(props.listItems)}</div>}
			</div>
			<Rank rank={props.rank} />
			<Label label={props.mark} color="#EC4179" />
		</div>
	);
};

export default Header;
