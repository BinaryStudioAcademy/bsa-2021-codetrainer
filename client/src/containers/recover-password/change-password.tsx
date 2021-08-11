import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChangePassword as Password, FullscreenLoader } from 'components';
import { useAppSelector } from 'hooks/useAppSelector';
import { resetPassword, recoverPasswordStateReset } from './logic/actions';
import { useQuery } from 'hooks/useQuery';
import { ROUTES } from 'constants/routes';

export const ChangePassword: React.FC = () => {
	const dispatch = useDispatch();
	const { isLoading, errors, isSuccess } = useAppSelector((state) => state.auth.recoverPassword);
	const query = useQuery();
	const history = useHistory();
	const handleSubmit = (password: string) => {
		dispatch(resetPassword({ payload: { password, token: query.get('token') ?? '' } }));
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
		dispatch(recoverPasswordStateReset());
		history.push(ROUTES.SignIn);
	}, [isSuccess]);

	if (isLoading) {
		return <FullscreenLoader />;
	}

	return <Password onSubmit={handleSubmit} errors={readyErrors} />;
};
