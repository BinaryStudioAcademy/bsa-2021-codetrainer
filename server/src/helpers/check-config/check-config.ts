import { ConfigVariables, ConfigVariablesName } from '../../common';

export const checkConfig = () => {
	ConfigVariablesName.forEach((variable) => {
		if (!ConfigVariables[variable]) {
			console.error(`Configuration, is missing ${variable} parameter!`);
			process.exit(1);
		}
	});
};
