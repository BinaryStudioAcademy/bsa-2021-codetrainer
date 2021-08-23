import React, { useCallback } from 'react';
import { GithubEndpoints } from 'services/github.service';
import * as socialSettingsActions from './social/logic/actions';
import { useSettingsSelector, useUserSelector } from 'hooks/useAppSelector';
import { redirect } from '../../helpers/redirect-github.helper';
import { SettingPage } from 'components/pages';
import { useDispatch } from 'react-redux';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

import * as actions from 'containers/user/logic/actions';
import { updatePassword } from 'services/settings.service';

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
			if (values.skills && !Array.isArray(values.skills)) {
				values.skills = values.skills.split(',');
			}

			const data: any = {
				id: user?.id,
				user: {
					id: user?.id,
					name: user?.name,
					surname: user?.surname,
					...values,
				},
			};

			dispatch(actions.updateUser(data));
		},
		[user],
	);

	const onSubmitPasswordChange = useCallback(
		async (values: { currentPassword: string; newPassword: string }) => {
			const data: any = {
				id: user?.id,
				password: values.currentPassword,
				newPassword: values.newPassword,
			};
			try {
				await updatePassword(data);
			} catch (res) {
				console.log('err', res.errors.message);
				dispatch(
					setNotificationState({
						state: {
							notificationType: NotificationType.Error,
							message: res.errors.message,
							title: 'Update password',
						},
					}),
				);
				return;
			}

			dispatch(
				setNotificationState({
					state: {
						notificationType: NotificationType.Success,
						message: 'Password updated succesfull',
						title: 'Update password',
					},
				}),
			);
		},
		[user],
	);

	const onDelete = () => {
		const data: any = {
			id: user?.id,
		};
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

	const inititalDevLevel = user?.devLevel || 'trainee';
	const list = {
		initialValue: inititalDevLevel,
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
			avatar={user?.avatar}
			onSubmitPasswordChange={onSubmitPasswordChange}
		/>
	);
};

export default SettingPageContainer;
