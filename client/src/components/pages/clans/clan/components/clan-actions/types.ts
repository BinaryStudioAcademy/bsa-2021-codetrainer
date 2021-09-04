import { TVisitor } from './../../types';

export interface IClanActionsProps {
	visitor: TVisitor;
	handleLeave: () => void;
	handleJoin: () => void;
	handleInvitation: () => void;
	handleEdit: () => void;
}
