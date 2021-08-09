const getMounthName = (date: Date) => {
	return date.toLocaleString('en-us', {
		month: 'long',
	});
};

export default getMounthName;
