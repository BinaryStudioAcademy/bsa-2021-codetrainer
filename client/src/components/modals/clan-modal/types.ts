export enum ClanModalType {
	CREATE = 'create',
	EDIT = 'edit',
}

export interface IClanForm {
	name: string;
	description?: string;
	maxMembers: number;
	isPublic: boolean;
	avatar?: string | null;
	cover?: string | null;
}

export interface IClanModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	type?: ClanModalType;
	isLoading?: boolean;
	initial?: IClanForm;
	onSubmit?: (clan: IClanForm) => void;
	onDelete?: () => void;
}
