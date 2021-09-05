import { MembersSortStrategy, IMemberWithPosition } from './types';

export const membersSorts: Record<MembersSortStrategy, (a: IMemberWithPosition, b: IMemberWithPosition) => number> = {
	[MembersSortStrategy.HONOR]: (a, b) => a.position - b.position,
	[MembersSortStrategy.NAME]: (a, b) => a.username.localeCompare(b.username),
	[MembersSortStrategy.JOINED_AT]: (a, b) => +new Date(a.profileClan.joinedAt) - +new Date(b.profileClan.joinedAt),
};
