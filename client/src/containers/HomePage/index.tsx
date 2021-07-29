import React from 'react';

import styles from './homePage.module.scss';

import NextTask from '../../components/common/NextTask/index';
import Community from '../../components/common/Community/index';
import Feed from '../../components/common/Feed/index';

const testUsers = [
	{
		id: '1',
		rank: 9,
		imageSource: '',
		name: 'Rayna Herwitz',
		clan: 'Fiksiki',
		honor: 455,
	},
	{
		id: '2',
		rank: 5,
		imageSource: '',
		name: 'Ruben Vaccaro',
		clan: 'Fiksiki',
		honor: 329,
	},
	{
		id: '3',
		rank: 2,
		imageSource: '',
		name: 'Dulce Workman',
		clan: 'Fiksiki',
		honor: 555,
	},
];

const testMessages = [
	{
		id: '01',
		userImageSource: '',
		userName: 'Angel Mango',
		clan: 'Clan “Fiksiki”',
		date: '2 hour ago',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in turpis sed vitae egestas nullam semper aenean. Neque id tortor, nibh netus viverra sed orci. Convallis faucibus tempor in vitae nulla lectus.',
	},
	{
		id: '02',
		userImageSource: '',
		userName: 'Jaydon Passaquindici Arcand',
		clan: 'Clan “Fighter”',
		date: '2 hour ago',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis feugiat volutpat aliquet in. Morbi morbi sed neque metus, scelerisque enim molestie bibendum metus. Et cras venenatis nunc adipiscing cursus enim. Nullam velit arcu vitae in tincidunt fringilla nisi, magna amet.',
	},
	{
		id: '03',
		userImageSource: '',
		userName: 'Allison Ekstrom Bothman',
		clan: 'Clan “Mivina”',
		date: '2 hour ago',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in turpis sed vitae egestas nullam semper.',
	},
];

const HomePage: React.FC = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.plug}>Sidebar plug</div>

			<div className={styles.mainWrapper}>
				<div className={styles.plug}>Header plug</div>

				<div className={styles.contentWrapper}>
					<div className={styles.container}>
						<h3 className={styles.userGreeting}>Hi, Rayna!</h3>

						<div className={styles.nextTaskWrapper}>
							<NextTask />
						</div>

						<div className={styles.communityWrapper}>
							<Community users={testUsers} />
						</div>

						<div className={styles.feedWrapper}>
							<Feed messages={testMessages} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
