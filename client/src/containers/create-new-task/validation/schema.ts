import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(1, 'Task name can`t be empty')
		.max(250, 'Task name is max 250 symbols')
		.required('Task name can`t be empty.'),
	discipline: Yup.string().required('discipline can`t be empty.'),
	rank: Yup.number()
		.min(1, 'Rank must be a number from 1 to 9.')
		.max(9, 'Rank must be a number from 1 to 9.')
		.required('Rank must be a number from 1 to 9.'),
	allowContributors: Yup.boolean().required('allowContributors name can`t be empty.'),
	tags: Yup.array(),
	description: Yup.string().min(1, 'description can`t be empty.').required('Task name can`t be empty.'),
	completeSolution: Yup.string().min(1, 'completeSolution can`t be empty.').required('Task name can`t be empty.'),
	initialSolution: Yup.string().min(1, 'initialSolution can`t be empty.').required('Task name can`t be empty.'),
	testCases: Yup.string().min(1, 'testCases can`t be empty.').required('Task name can`t be empty.'),
	exampleTestCases: Yup.string()
		.min(1, 'exampleTestCases can`t be empty.')
		.required('exampleTestCases can`t be empty.'),
	isPublished: Yup.boolean(),
});
