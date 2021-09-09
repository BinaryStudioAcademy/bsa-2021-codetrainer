import { Order } from 'helpers/table-helper';

export interface ISortingStrategy<I> {
	strategy: I;
	order: Order;
}

export interface ISortLabelProps<I> {
	current?: ISortingStrategy<I>;
	strategy: I;
	setSortingStrategy: (strategy: ISortingStrategy<I>) => void;
	defaultOrder?: Order;
	className?: string;
}
