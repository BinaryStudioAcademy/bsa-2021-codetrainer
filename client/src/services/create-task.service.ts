import { http } from 'services';

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

const requestBodyValidation = (requestBody: ICreateTaskBody) => {
	const { name, rank, description, completeSolution, initialSolution, testCases, exampleTestCases } = requestBody;
	let validationStatus = true;
	let errorMessage = '';
	if (name && name.trim() === '') {
		validationStatus = false;
		errorMessage = 'Task name can`t be empty.';
	} else if (rank && (rank.toString().trim().length > 1 || rank > 8 || rank < 1)) {
		validationStatus = false;
		errorMessage = 'Rank must be a number from 1 to 8.';
	} else if (description && description.trim() === '') {
		validationStatus = false;
		errorMessage = 'Description can`t be empty.';
	} else if (completeSolution && completeSolution.trim() === '') {
		validationStatus = false;
		errorMessage = 'Complete Solution can`t be empty.';
	} else if (initialSolution && initialSolution.trim() === '') {
		validationStatus = false;
		errorMessage = 'Initial Solution can`t be empty.';
	} else if (testCases && testCases.trim() === '') {
		validationStatus = false;
		errorMessage = 'Test Cases tab can`t be empty.';
	} else if (exampleTestCases && exampleTestCases.trim() === '') {
		validationStatus = false;
		errorMessage = 'Example Test Cases tab can`t be empty.';
	}
	return {
		validationStatus,
		errorMessage,
	};
};

export const createTask = async (requestBody: ICreateTaskBody) => {
	const { validationStatus, errorMessage } = requestBodyValidation(requestBody);
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
	const { validationStatus, errorMessage } = requestBodyValidation(requestBody);
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
