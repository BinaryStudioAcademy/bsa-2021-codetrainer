import { http } from 'services';
import * as Yup from 'yup';
interface ICreateTaskBody {
	name?: string;
	discipline?: string;
	// languageId: language.id.toString(),
	rank?: number;
	allowContributors?: boolean;
	tags?: string;
	description?: string;
	completeSolution?: string;
	initialSolution?: string;
	testCases?: string;
	exampleTestCases?: string;
	isPublished?: boolean;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().min(1, 'Task name can`t be empty').required('Task name can`t be empty.'),
	discipline: Yup.string().required('discipline can`t be empty.'),
	rank: Yup.number()
		.min(1, 'Rank must be a number from 1 to 8.')
		.max(8, 'Rank must be a number from 1 to 8.')
		.required('Rank must be a number from 1 to 8.'),
	allowContributors: Yup.boolean().required('allowContributors name can`t be empty.'),
	tags: Yup.string(),
	description: Yup.string().min(1, 'description can`t be empty.').required('Task name can`t be empty.'),
	completeSolution: Yup.string().min(1, 'completeSolution can`t be empty.').required('Task name can`t be empty.'),
	initialSolution: Yup.string().min(1, 'initialSolution can`t be empty.').required('Task name can`t be empty.'),
	testCases: Yup.string().min(1, 'testCases can`t be empty.').required('Task name can`t be empty.'),
	exampleTestCases: Yup.string()
		.min(1, 'exampleTestCases can`t be empty.')
		.required('exampleTestCases can`t be empty.'),
	isPublished: Yup.boolean(),
});

export const createTask = async (requestBody: ICreateTaskBody) => {
	const validationStatus = true;
	let errorMessage = '';
	try {
		await validationSchema.validate(requestBody);
	} catch (validationErrors) {
		errorMessage = validationErrors.message;
		return {
			error: true,
			message: errorMessage,
		};
	}

	if (validationStatus) {
		const res = await http.callWebApi({
			method: 'POST',
			endpoint: `tasks`,
			skipAuthorization: false,
			body: requestBody,
		});
		if (res) {
			return res;
		} else {
			return {
				error: true,
				message: 'Server error',
			};
		}
	} else {
		return {
			error: true,
			message: errorMessage,
		};
	}
};

export const updateTask = async (requestBody: ICreateTaskBody, taskId: string) => {
	const validationStatus = true;
	let errorMessage = '';
	try {
		await validationSchema.validate(requestBody);
	} catch (validationErrors) {
		errorMessage = validationErrors.message;
		return {
			error: true,
			message: errorMessage,
		};
	}
	if (validationStatus) {
		const res = await http.callWebApi({
			method: 'PUT',
			endpoint: 'tasks/' + taskId,
			skipAuthorization: false,
			body: requestBody,
		});
		if (res) {
			return res;
		} else {
			return {
				error: true,
				message: 'Server error',
			};
		}
	} else {
		return {
			error: true,
			message: errorMessage,
		};
	}
};

export const deleteTask = async (taskId: string) => {
	const result = await http.callWebApi({
		endpoint: 'tasks/' + taskId,
		method: 'DELETE',
		skipAuthorization: false,
	});
	if (result.delete === 'success') {
		return {
			error: false,
			message: 'success',
		};
	} else {
		return {
			error: true,
			message: result[0].message,
		};
	}
};
