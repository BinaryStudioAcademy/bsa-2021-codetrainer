import { dotEnv } from '../helpers/dot-env';

const variables = process.env;

const ENV = {
	APP: {
		API_PATH: '/api',
		URL: variables?.NODE_ENV === 'development' ? 'http://localhost:5000' : dotEnv('APP_URL'),
		NAME: 'testing',
	},
	JWT: {
		SECRET: dotEnv('SECRET_KEY'),
		EXPIRES_IN: '30m',
	},
	AMQP: {
		URL: dotEnv('AMQP_URL'),
		QUEUE: dotEnv('AMQP_QUEUE'),
	},
};

export { ENV };
