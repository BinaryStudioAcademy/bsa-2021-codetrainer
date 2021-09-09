import { ServerOptions } from 'socket.io';
import { ENV, LOCAL_HOST_URL } from '../common';

export const socketOptions: Partial<ServerOptions> = {
	cors: {
		origin: ENV.DEVELOPMENT ? LOCAL_HOST_URL : ENV.APP.CLIENT_URL,
		methods: ['GET', 'POST'],
		credentials: true,
	},
};
