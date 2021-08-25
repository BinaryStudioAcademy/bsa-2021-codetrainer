import get from 'lodash.get';

export type SortOrder = -1 | 0 | 1;

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T): SortOrder {
	if (get(b, orderBy) < get(a, orderBy)) {
		return -1;
	}
	if (get(b, orderBy) > get(a, orderBy)) {
		return 1;
	}
	return 0;
}

export function getComparator<T>(orderBy: keyof T, order?: Order): (a: T, b: T) => number {
	return order === Order.DESC
		? (a: T, b: T): SortOrder => descendingComparator(a, b, orderBy)
		: (a: T, b: T): SortOrder => -descendingComparator(a, b, orderBy) as SortOrder;
}

export enum Order {
	ASC = 'asc',
	DESC = 'desc',
}
