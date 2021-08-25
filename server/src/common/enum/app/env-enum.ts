import { getEnv } from '../../../helpers';

const variables = process.env;

const ENV = {
	APP: {
		PORT: getEnv('PORT'),
		API_PATH: '/api',
		URL: variables?.NODE_ENV === 'development' ? 'http://localhost:3000' : getEnv('APP_URL'),
	},
	TESTING: {
		NAME: 'testing',
	},
	JWT: {
		SECRET: getEnv('SECRET_KEY'),
		EXPIRES_IN: '30m',
		REFRESH_EXPIRES_IN: '30d',
		RESET_EXPIRES_IN: '1d',
	},
	COOKIE: {
		SECRET: getEnv('COOKIE_SECRET'),
	},
	DB: {
		DATABASE: getEnv('TYPEORM_DATABASE'),
		USERNAME: getEnv('TYPEORM_USERNAME'),
		PASSWORD: getEnv('TYPEORM_PASSWORD'),
		HOST: getEnv('TYPEORM_HOST'),
		PORT: getEnv('TYPEORM_PORT'),
		DIALECT: getEnv('TYPEORM_CONNECTION'),
		SYNCHRONIZE: getEnv('TYPEORM_SYNCHRONIZE'),
		LOGGING: getEnv('TYPEORM_LOGGING'),
		MIGRATIONS: getEnv('TYPEORM_MIGRATIONS'),
		ENTITIES: getEnv('TYPEORM_ENTITIES'),
		MIGRATIONS_DIR: getEnv('TYPEORM_MIGRATIONS_DIR'),
		ENTITIES_DIR: getEnv('TYPEORM_ENTITIES_DIR'),
		SSL: getEnv('TYPEORM_SSL'),
	},
	AWS: {
		IMAGES: {
			BUCKET: getEnv('AWS_IMAGES_BUCKET_NAME'),
			REGION: getEnv('AWS_IMAGES_BUCKET_REGION'),
			ACCESS_KEY: getEnv('AWS_IMAGES_ACCESS_KEY'),
			SECRET_KEY: getEnv('AWS_IMAGES_SECRET_KEY'),
		},
	},
	MAILER: {
		ADDRESS: getEnv('EMAIL_ADDRESS'),
		PASSWORD: getEnv('EMAIL_PASSWORD'),
	},
	GITHUB: {
		CLIEND_ID: getEnv('GITHUB_CLIENT_ID'),
		SECRET: getEnv('GITHUB_SECRET'),
		CALLBACK: getEnv('GITHUB_CALLBACK'),
	},
	AMQP: {
		URL: getEnv('AMQP_URL'),
		QUEUE: getEnv('AMQP_QUEUE'),
	},
};

export { ENV };
