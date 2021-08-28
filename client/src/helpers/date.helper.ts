export const getMonthName = (date: Date) => {
	return date.toLocaleString('en-us', {
		month: 'long',
	});
};


export const getShortMonthName = (date: Date) => {
	return date.toLocaleString('en-us', {
		month: 'short',
	});
};

export const getFullDate = (date: Date) => {
	return `${date.getDate()} ${getShortMonthName(date)} ${date.getFullYear()}`
}
