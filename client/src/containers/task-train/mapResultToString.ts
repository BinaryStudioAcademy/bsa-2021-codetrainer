import { ITest } from './logic/state';

export const mapResultToString = (result: ITest['result']): string => {
	const str = Object.entries(result?.response?.stats || {}).reduce(
		(str, [key, value]) => str + `* ${key}: ${value}\n`,
		'',
	);
	return result?.response ? str : result?.error || '';
};
