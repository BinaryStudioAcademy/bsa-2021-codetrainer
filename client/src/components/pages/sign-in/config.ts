import * as yup from 'yup';

export const SIGN_IN_SCHEMA = yup.object().shape({
	email: yup.string().email('Invalid email').required('Required'),
	password: yup.string().min(8, 'Minimum length: 8').max(25, 'Maximum length: 25').required('Required'),
});
