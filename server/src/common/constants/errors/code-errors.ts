import { HttpCodes } from '../../enum';

export const CODE_ERRORS = {
	CLAN_NAME_IS_TAKEN: (name: string) => ({ message: `Clan name: ${name} is already taken.`, status: 401 }),
	NO_CLAN: { message: 'You have no clan.', status: 401 },
	CLAN_NOT_EXIST: (id: string) => ({ message: `Clan with id ${id} does not exist.`, status: 401 }),
	CLAN_NOT_PERMISSION: { message: 'no permission', status: HttpCodes.FORBIDDEN },
	IN_CLAN: { message: 'You are already in clan.', status: 401 },
	NOT_IN_CLAN: { message: 'You are not in clan.', status: 401 },
	LAST_ADMIN_LEAVE: { message: 'There should be at least 1 admin after leaving the clan.', status: 401 },
	TOKEN_VERIFY: { message: 'Token verify error', status: 401 },
	TOKEN_EXPIRED: { message: 'Token expired', status: 401 },
	TOKEN_INVALID: { message: 'Invalid token', status: 401 },
	TASK_QUERY: (value: string) => ({ message: `Invalid ${value} format`, status: HttpCodes.BAD_REQUEST }),
	TAG_NAME_EXIT: (name: string) => ({
		message: `Tag name: ${name} is already taken.`,
		status: HttpCodes.BAD_REQUEST,
	}),
	NOT_FOLLOWING: {
		message: `User is not followed to unfollow`,
		status: HttpCodes.BAD_REQUEST,
	},
	ALREADY_FOLLOWING: {
		message: `User is already followed`,
		status: HttpCodes.BAD_REQUEST,
	},
	EMAIL_NOT_EXIST: (email: string) => ({
		message: `User with email: ${email}, not exist!`,
		status: HttpCodes.NOT_FOUND,
	}),
	EMAIL_ALREADY_EXIST: {
		message: `Email is already taken.`,
		status: HttpCodes.BAD_REQUEST,
	},
	USERNAME_ALREADY_EXIST: {
		message: `Username is already taken.`,
		status: HttpCodes.BAD_REQUEST,
	},
	PASSWORD_NOT_MATCH: {
		message: `Password does not match.`,
		status: HttpCodes.BAD_REQUEST,
	},
	USER_NOT_EXIST: { message: `User not exist!`, status: HttpCodes.NOT_FOUND },
	NOT_USER_SOLUTION: { message: "this is not this user's solution", status: HttpCodes.BAD_REQUEST },
	NOT_USER_COMMENT_SOLUTION: { message: 'this is not a comment from this user', status: HttpCodes.BAD_REQUEST },
	SOLUTION_STATUS_WRONG: { message: 'solution status wrong', status: HttpCodes.BAD_REQUEST },
	SOLUTION_TYPE_WRONG: { message: 'solution type wrong', status: HttpCodes.BAD_REQUEST },
	SOLUTION_STATUS_UNLOCKED: { message: 'solution is unlocked', status: HttpCodes.BAD_REQUEST },
	SOLUTION_THIS_USER: { message: 'you already have a solution for this task', status: HttpCodes.BAD_REQUEST },
	TESTING_NAME_INCORRECT: { message: 'testing name incorrect', status: HttpCodes.BAD_REQUEST },
	USERNAME_NOT_EXIST: (username: string) => ({
		message: `User ${username} does not exist.`,
		status: HttpCodes.NOT_FOUND,
	}),
	USER_NOT_AUTHOR: { message: 'User is not author of comment', status: HttpCodes.BAD_REQUEST },
	USER_NO_CLAN: { message: 'User doesn`t have a clan', status: HttpCodes.NOT_FOUND },
	SOCKET_AUTHORIZATION_ERROR: { message: 'Token Error', status: HttpCodes.BAD_REQUEST },
};
