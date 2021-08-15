import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SettingPage } from 'components/pages';
import { GithubEndpoints } from 'services/github.service';
import * as socialSettingsActions from './social/logic/actions';
import { useSettingsSelector, useUserSelector } from 'hooks/useAppSelector';
import { redirect } from '../../helpers/redirect-github.helper';

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
	const dispatch = useDispatch();
	const user = useUserSelector();
	const settings = useSettingsSelector();

	const toggleGithubLink = useCallback(() => {
		if (!user?.github) {
			redirect(GithubEndpoints.LINK);
		} else {
			dispatch(socialSettingsActions.unlinkFromGithub());
		}
	}, [user]);

	return (
		<SettingPage
			information={{
				list: list,
				formItems: formItems,
			}}
			social={{
				github: {
					profile: user?.github,
					onGithubLink: toggleGithubLink,
					error: settings.social.github.error,
				},
				...socialLinks,
			}}
		/>
	);
};

export default SettingPageContainer;
