import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { IRootState } from 'typings/root-state';

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
