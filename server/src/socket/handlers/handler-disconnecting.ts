import { Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../../common';
import { sockets } from '../sockets/sockets';

export const registerHandlerDisconnecting = (socket: Socket) => {
	const handlerDisconnecting = () => {
		sockets.removeBySocketId(socket.id);
	};

	socket.on(SOCKET_EVENTS.DISCONNECTING, handlerDisconnecting);
};
