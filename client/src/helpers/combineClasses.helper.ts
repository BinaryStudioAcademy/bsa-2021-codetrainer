export function combineClasses(...classes: (string | undefined | null)[]): string {
	return classes
		.filter(className => Boolean(className))
		.join(' ');
}
