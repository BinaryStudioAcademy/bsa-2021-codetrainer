import { Socket, Server } from 'socket.io';
import { SOCKET_EVENTS } from '../common';
import { registerHandlerDisconnecting } from './handlers';
import { authorization } from './middleware/authorization';

export const socketHandler = (io: Server) => {
	io.use(authorization);
	io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
		registerHandlerDisconnecting(socket);
	});
};

export { sockets } from './sockets/sockets';
