export const fromEntries = (iterable: Array<[string, any]>): Record<string, any> => {
	return [...iterable].reduce((obj, [key, value]) => {
		obj[key] = value;
		return obj;
	}, {} as Record<string, any>);
};
