import React, { useCallback } from 'react';
import { GithubEndpoints } from 'services/github.service';
import * as socialSettingsActions from './social/logic/actions';
//import { useSettingsSelector } from 'hooks/useAppSelector';
import { useSettingsSelector, useUserSelector } from 'hooks/useAppSelector';
import { redirect } from '../../helpers/redirect-github.helper';
import { SettingPage } from 'components/pages';
//import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import * as actions from 'containers/user/logic/actions';

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

	const onSubmit = useCallback(
		(values: any) => {
			console.log(values);
			if (values.skills && !Array.isArray(values.skills)) {
				values.skills = values.skills.split(',');
				console.log(values.skills);
			}

			const data: any = {
				id: user?.id,
				user: {
					name: user?.name,
					surname: user?.surname,
					...values,
				},
			};

			console.log(data);

			dispatch(actions.updateUser(data));
		},
		[user],
	);

	const onDelete = () => {
		const data: any = {
			id: user?.id,
		};
		console.log(data);
		dispatch(actions.deleteUser(data));
	};

	const formItems = [
		{
			id: 'email',
			name: 'email',
			label: 'Email',
			placeholder: 'Enter your email',
			initialText: user?.email,
			type: 'text',
		},
		{
			id: 'username',
			name: 'username',
			label: 'Username',
			placeholder: 'Enter your username',
			initialText: user?.username,
			type: 'text',
		},
		{
			id: 'name',
			name: 'name',
			label: 'Name',
			placeholder: 'Enter your name',
			initialText: user?.name,
			type: 'text',
		},
		{
			id: 'surname',
			name: 'surname',
			label: 'Surname',
			placeholder: 'Enter your surname',
			initialText: user?.surname,
			type: 'text',
		},
		{
			id: 'clan',
			name: 'clan',
			label: 'Clan',
			placeholder: 'You are not in a clan',
			readonly: true,
			initialText: user?.clan?.name,
			type: 'text',
		},
		{
			id: 'skills',
			name: 'skills',
			label: 'Skills (comma separated)',
			placeholder: 'Enter your skills',
			initialText: user?.skills,
			type: 'text',
		},
	];

	const list = {
		initialValue: user?.devLevel,
		name: 'devLevel',
		items: radioListItems,
	};

	let twitterUrl, linkedinUrl, stackUrl;

	if (user?.social) {
		twitterUrl = user.social[0] ? user.social[0].trim() : '';
		linkedinUrl = user.social[1] ? user.social[1].trim() : '';
		stackUrl = user.social[2] ? user.social[2].trim() : '';
	}

	const socialLinks = {
		twitterUrl,
		linkedinUrl,
		stackUrl,
	};

	return (
		<SettingPage
			information={{
				list,
				formItems,
				onSubmit,
			}}
			social={{
				github: {
					profile: user?.github,
					onGithubLink: toggleGithubLink,
					error: settings.social.github.error,
				},
				...socialLinks,
				onSubmit,
			}}
			onDelete={onDelete}
		/>
	);
};

export default SettingPageContainer;
