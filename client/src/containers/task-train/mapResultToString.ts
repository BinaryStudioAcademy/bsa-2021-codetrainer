import { IResult } from './logic/state';

export const mapResultToString = ({ response, error }: IResult): string => {
	const result = Object.entries(response?.stats || {}).reduce(
		(str, [key, value]) => str + `* ${key}: ${value}\n`,
		'',
	);
	return response ? result : error || '';
};
