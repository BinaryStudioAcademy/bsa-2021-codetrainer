export const getMonthName = (date: Date) => {
	return date?.toLocaleString('en-us', {
		month: 'short',
	});
};

export const getFullDate = (date: Date) => {
	if (typeof date === 'string') {
		date = new Date(date);
	}
	return `${date?.getDate()} ${getMonthName(date)} ${date?.getFullYear()}`;
};
