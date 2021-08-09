export const CODE_ERRORS = {
	CLAN_NAME_IS_TAKEN: (name: string) => ({ message: `Clan name: ${name} is already taken.`, status: 401 }),
	NO_CLAN: { message: 'You have no clan.', status: 401 },
	NOT_EXIST: (id: string) => ({ message: `Clan with id ${id} does not exist.`, status: 401 }),
	IN_CLAN: { message: 'You are already in clan.', status: 401 },
	NOT_IN_CLAN: { message: 'You are not in clan.', status: 401 },
	ADMIN_LEAVE: { message: 'Admin can not leave his clan.', status: 401 },
	TOKEN_VERIFY: { message: 'Token verify error', status: 401 },
	TOKEN_EXPIRED: { message: 'Token expired', status: 401 },
	TOKEN_INVALID: { message: 'Invalid token', status: 401 },
};
