import { ValidationError } from 'yup';
import { WebApi } from 'typings/webapi';
import { validationSchema } from './schema';

export const validationTaskField = async (task: Partial<WebApi.Entities.ITask>): Promise<string | true> => {
	try {
		await validationSchema.validate(task);
		return true;
	} catch (error) {
		return (error as ValidationError | Error)?.message ?? 'unknown error';
	}
};
