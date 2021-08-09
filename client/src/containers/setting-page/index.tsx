import React from 'react';
import { SettingPage } from 'components/pages';

const radioListItems = [
	{
		value: 'trainee',
		text: 'Learning to program',
	},
	{
		value: 'junior',
		text: 'Junior Developer',
	},
	{
		value: 'middle',
		text: 'Mid-Level Developer',
	},
	{
		value: 'senior',
		text: 'Senior Developer',
	},
];

const list = {
	initialValue: 'middle',
	name: 'experience',
	items: radioListItems,
};

const formItems = [
	{
		id: 'email',
		name: 'email',
		label: 'Email',
		placeholder: 'Enter your email',
		initialText: 'rayna-herwits@gmail.com',
		type: 'text',
	},
	{
		id: 'username',
		name: 'username',
		label: 'Username',
		placeholder: 'Enter your username',
		initialText: 'Rayna Herwits',
		type: 'text',
	},
	{
		id: 'name',
		name: 'name',
		label: 'Name',
		placeholder: 'Enter your name',
		initialText: 'Rayna',
		type: 'text',
	},
	{
		id: 'clan',
		name: 'clan',
		label: 'Clan',
		placeholder: 'Enter your clan',
		initialText: 'fiksiki',
		type: 'text',
	},
	{
		id: 'skills',
		name: 'skills',
		label: 'Skills (comma separated)',
		placeholder: 'Enter your skills',
		initialText: 'Java Script, SQL',
		type: 'text',
	},
];

const socialLinks = {
	twitterUrl: 'https://twitter.com/rayna-herwits',
	linkedinUrl: 'https://linkedin.com/rayna-herwits',
	stackUrl: 'https://stackoverflow.com/rayna-herwits',
};

const SettingPageContainer: React.FC = () => {
	return (
		<SettingPage
			information={{
				list: list,
				formItems: formItems,
			}}
			social={socialLinks}
		/>
	);
};

export default SettingPageContainer;
