import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar/index';
import Label from '../Label/index';
import styles from './header.module.scss';
import * as img from './imageHelper';

interface Prop {
	name: string;
	rank: number;
	notificationCounter: number;
	mark: number;
	avatar: string;
}
interface listItem {
	image: string;
	text: string;
	link: string;
	id: string;
}

const listItems = [{
		id: '1',
		image: img.menuProfile,
		text: 'View Profile',
		link: '/'
	},{
		id: '2',
		image: img.menuSettings,
		text: 'Account Settings',
		link: '/'
	},{
		id: '3',
		image: img.menuChallenge,
		text: 'New Challenge',
		link: '/'
	},{
		id: '4',
		image: img.menuSignout,
		text: 'Sign out',
		link: '/'
}];

const Header: React.FC<Prop> = (props) => {

	const [isListVisible, setListVisibility] = useState(false);

	const changeVisible = () => {
		setListVisibility(!isListVisible);
	}	

	const getListItem = (item: listItem) => {
		return (
			<li className={styles.navigation__item} key={item.id}>
				<NavLink to={item.link} className={styles.navigation__link}>
					<img src={item.image} alt='listItem' />
					<span>{item.text}</span>
				</NavLink>
			</li>
		);
	}

	const renderList = (items: listItem[]) => {
		return (
			<ul className={styles.navigation__list}>
				{items.map((item: listItem) => getListItem(item))}
			</ul>
		);
	}

	return (
		<div className={styles.header}>
			<div className={styles.bell}>
				<img src={img.bell} alt='bell' />
				<div className={styles.bell__counter}>
					<span>{props.notificationCounter}</span>
				</div>
			</div>
			<span className={styles.name}>{props.name}</span>
			<div className={styles.avatarCover}>
				<div onClick={changeVisible}>
					<Avatar
						avatar={props.avatar}
						size={61}
						color='#EC4179'
					/>
				</div>

				{isListVisible && <div className={styles.navigation}>
					{renderList(listItems)}
				</div>}

			</div>
			<Label
				label={props.rank + ' rank'}
				color='#EC4179'
			/>
			<Label
				label={props.mark}
				color='#EC4179'
			/>
		</div>
	);
}

export default Header;
