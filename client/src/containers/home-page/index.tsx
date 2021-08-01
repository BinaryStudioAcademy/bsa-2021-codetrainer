import { HomePage } from 'components/pages';
import React from 'react';

const testActiveUser = {
	id: '13',
	rank: 5,
	imageSource: '',
	name: 'Test User',
	clan: 'Test',
	honor: 322,
};

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
		id: '3',
		rank: 2,
		imageSource: '',
		name: 'Dulce Workman',
		clan: 'Fiksiki',
		honor: 555,
	},
	{
		id: '3',
		rank: 2,
		imageSource: '',
		name: 'Dulce Workman',
		clan: 'Fiksiki',
		honor: 555,
	},
	{
		id: '3',
		rank: 2,
		imageSource: '',
		name: 'Dulce Workman',
		clan: 'Fiksiki',
		honor: 555,
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

const HomePageContainer: React.FC = () => {
	return <HomePage activeUser={testActiveUser} users={testUsers} messages={testMessages} />;
};

export default HomePageContainer;
