export const ERRORS = {
	NO_TASK: { message: 'there is no such task' },
	NO_CLAN: { message: 'You have no clan' },
};

export const CREATE_ERRORS = <T>(error: T, errors?: T[]): T[] => {
	return [...(errors || []), error];
};
