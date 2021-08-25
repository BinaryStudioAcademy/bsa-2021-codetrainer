import { ServerOptions } from 'socket.io';
import { ENV, LOCAL_HOST_URL, STAGING_URL } from '../common';

export const socketOptions: Partial<ServerOptions> = {
	cors: {
		origin: ENV.DEVELOPMENT ? LOCAL_HOST_URL : STAGING_URL,
		methods: ['GET', 'POST'],
		// allowedHeaders: ['my-custom-header'],
		credentials: true,
	},
};
