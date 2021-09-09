import * as yup from 'yup';

export const SIGN_IN_SCHEMA = yup.object().shape({
	email: yup.string().required('Required').email('Invalid email'),
	password: yup.string().required('Required').min(8, 'Minimum length: 8').max(25, 'Maximum length: 25'),
});
