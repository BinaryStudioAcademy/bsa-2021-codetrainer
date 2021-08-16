import { useLocation } from 'react-router-dom';

export function useQuery<Q extends { [K in keyof Q]?: string } = Record<string, never>>(): Q {
	return Object.fromEntries(new URLSearchParams(useLocation().search).entries()) as Q;
}
