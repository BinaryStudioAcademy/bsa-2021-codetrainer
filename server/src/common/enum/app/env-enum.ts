import { getEnv } from '../../../helpers';

const ConfigVariables = process.env;

const ENV = {
	APP: {
		PORT: getEnv('PORT'),
		API_PATH: '/api'
	},
	JWT: {
		SECRET: getEnv('SECRET_KEY'),
		ISSUER: getEnv('ISSUER'),
		EXPIRES_IN: '24h',
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
			SECRET_KEY: getEnv('AWS_IMAGES_SECRET_KEY')
		}
	}
};

export { ENV, ConfigVariables };
