export const getMonthName = (date: Date) => {
	return date.toLocaleString('en-us', {
		month: 'long',
	});
};

export const getFullDate = (date: Date) => {
	return `${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`
}
