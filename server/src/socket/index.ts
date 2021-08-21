import { Socket, Server } from 'socket.io';
import { SOCKET_EVENTS } from './common';
import { registerHandlerDisconnecting } from './handler-events';
import { authorization } from './middleware/authorization';

export default (io: Server) => {
	io.use(authorization);
	io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
		registerHandlerDisconnecting(socket);
	});
};
