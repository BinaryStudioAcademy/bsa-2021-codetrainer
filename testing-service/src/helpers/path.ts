import { NAME_DIR } from '../common/constants';

export const getPath = () => {
	const index = __dirname.indexOf(NAME_DIR);
	return __dirname.slice(0, index + NAME_DIR.length);
};
