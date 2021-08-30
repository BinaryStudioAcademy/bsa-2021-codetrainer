export const getMonthName = (date: Date) => {
	return date.toLocaleString('en-us', {
		month: 'short',
	});
};

export const getFullDate = (date: Date) => {
	return `${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`
}
