import { io, Socket, SocketOptions, ManagerOptions } from 'socket.io-client';
import { AccessToken } from '../auth/access-token';
import { SOCKET_EVENTS, SOCKET_URL } from 'constants/socket-constants';

export class CustomSocket {
	private socket: Socket;
	private options: Partial<SocketOptions & ManagerOptions> = {
		withCredentials: true,
		autoConnect: false,
	};
	private url = process.env.NODE_ENV === 'development' ? SOCKET_URL.LOCAL : SOCKET_URL.STAGING;
	constructor() {
		this.socket = io(this.url, this.options);
		this.socket.on(SOCKET_EVENTS.CONNECT_ERROR, this.connectError.bind(this));
		this.socket.on(SOCKET_EVENTS.RESULT_TEST_TO_CLIENT, this.result.bind(this));
	}

	connect() {
		this.socket.auth = { ...this.socket.auth, token: AccessToken.token };
		this.socket.connect();
	}

	connectError(error: Error) {
		if (error.message === 'Token verify error') {
			this.connect();
		}
	}

	on(event: string, listener: (...args: any[]) => any) {
		this.socket.on(event, listener);
	}

	emit(event: string, ...args: any[]) {
		this.socket.emit(event, args);
	}

	result(data: unknown) {
		console.info('result => ', data);
	}
}

export const socket = new CustomSocket();
