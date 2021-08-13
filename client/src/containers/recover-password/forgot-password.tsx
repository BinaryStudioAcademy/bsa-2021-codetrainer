import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ForgotPassword as Password, FullscreenLoader } from 'components';
import { useAppSelector } from 'hooks/useAppSelector';
import { forgotPassword, recoverPasswordStateReset } from './logic/actions';
import { setNotificationState } from 'containers/notification/logic/actions';
import { NotificationType } from 'containers/notification/logic/models';

export const ForgotPassword: React.FC = () => {
	const dispatch = useDispatch();
	const { isLoading, errors, isSuccess } = useAppSelector((state) => state.auth.recoverPassword);

	const handleSubmit = (email: string) => {
		dispatch(forgotPassword({ payload: { email } }));
	};
	const readyErrors = useMemo(() => {
		if (!errors) {
			return null;
		}
		return typeof errors === 'string' ? [{ msg: errors }] : errors?.errors;
	}, [errors]);
	useEffect(() => {
		if (!isSuccess) {
			return;
		}
		dispatch(
			setNotificationState({
				state: {
					notificationType: NotificationType.Success,
					message: 'Email send',
					title: 'Forgot Password',
				},
			}),
		);
		dispatch(recoverPasswordStateReset());
	}, [isSuccess]);

	if (isLoading) {
		return <FullscreenLoader />;
	}

	return <Password onSubmit={handleSubmit} errors={readyErrors} />;
};
