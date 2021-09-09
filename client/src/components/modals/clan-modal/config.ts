import * as Yup from 'yup';

export const clanOptions = [
	{
		name: 'Public',
		label: 'Public',
		value: true,
	},
	{
		name: 'Private',
		label: 'Private',
		value: false,
	},
];

export const ClanSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Name is too short').max(30, 'Name is too long').required('Required'),
	description: Yup.string().max(3000, 'Description is too long'),
});
