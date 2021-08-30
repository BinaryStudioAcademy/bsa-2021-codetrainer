export const fromEntries = (iterable: Array<[string, any]>): Record<string, any> => {
	return iterable.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {} as Record<string, any>);
};
