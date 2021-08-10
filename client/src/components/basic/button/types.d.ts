import { MouseEvent } from 'react';

export interface IButtonProps {
	color?: string;
	className?: string;
	text: string;
	fill?: boolean;
	disabled?: boolean;
	taskButton?: boolean;
	onClick?: (event: MouseEvent) => void;
}
