import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { getCustomRepository } from 'typeorm';
import { CODE_ERRORS } from '../../common';
import { UserRepository } from '../../data';
import { TokenTypes, ValidationError, verifyToken } from '../../helpers';
import { sockets } from '../sockets/sockets';

export const authorization = async (socket: Socket, next: (err?: ExtendedError) => void) => {
	const { token } = socket.handshake.auth;
	try {
		const { id } = verifyToken(token, TokenTypes.ACCESS);
		const repository = getCustomRepository(UserRepository);
		const user = await repository.getById(id);
		if (!user) {
			sockets.remove(id);
			next(new ValidationError(CODE_ERRORS.TOKEN_VERIFY));
		} else {
			sockets.add({ userId: user.id, socketId: socket.id });
			next();
		}
	} catch (e) {
		next(new ValidationError(CODE_ERRORS.SOCKET_AUTHORIZATION_ERROR))
	}
};
