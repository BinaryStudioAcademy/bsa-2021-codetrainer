import { ENV } from '../common';

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Codetrainer API',
		version: '1.0.0',
		description: '',
		license: {
			name: 'Licensed Under MIT',
			url: 'https://spdx.org/licenses/MIT.html',
		},
	},
	servers: [
		{
			url: `http://localhost:${ENV.APP.PORT}`,
			description: 'Development server',
		},
		{
			url: `https://staging-api.codetrain.xyz/`,
			description: 'Staging server',
		},
	],
};

const options = {
	swaggerDefinition,
	apis: ['src/api/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
