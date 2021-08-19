import { HttpCodes } from '../../enum';

export const CODE_ERRORS = {
	CLAN_NAME_IS_TAKEN: (name: string) => ({ message: `Clan name: ${name} is already taken.`, status: 401 }),
	NO_CLAN: { message: 'You have no clan.', status: 401 },
	CLAN_NOT_EXIST: (id: string) => ({ message: `Clan with id ${id} does not exist.`, status: 401 }),
	CLAN_NOT_PERMISSION: { message: 'no permission', status: HttpCodes.FORBIDDEN },
	IN_CLAN: { message: 'You are already in clan.', status: 401 },
	NOT_IN_CLAN: { message: 'You are not in clan.', status: 401 },
	ADMIN_LEAVE: { message: 'Admin can not leave his clan.', status: 401 },
	TOKEN_VERIFY: { message: 'Token verify error', status: 401 },
	TOKEN_EXPIRED: { message: 'Token expired', status: 401 },
	TOKEN_INVALID: { message: 'Invalid token', status: 401 },
	TASK_QUERY: (value: string) => ({ message: `Invalid ${value} format`, status: HttpCodes.BAD_REQUEST }),
	TAG_NAME_EXIT: (name: string) => ({
		message: `Tag name: ${name} is already taken.`,
		status: HttpCodes.BAD_REQUEST,
	}),
	EMAIL_NOT_EXIST: (email: string) => ({
		message: `User with email: ${email}, not exist!`,
		status: HttpCodes.NOT_FOUND,
	}),
	USER_NOT_EXIST: { message: `User not exist!`, status: HttpCodes.NOT_FOUND },
	NOT_USER_SOLUTION: { message: "not this user's solution", status: HttpCodes.BAD_REQUEST },
	SOLUTION_STATUS_WRONG: { message: 'solution status wrong', status: HttpCodes.BAD_REQUEST },
	USERNAME_NOT_EXIST: (username: string) => ({
		message: `User ${username} does not exist.`,
		status: HttpCodes.NOT_FOUND,
	}),
};
