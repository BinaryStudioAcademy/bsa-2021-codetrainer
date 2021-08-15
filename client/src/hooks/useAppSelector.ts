import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { IRootState } from 'typings/root-state';

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export const useUserSelector = () => useAppSelector((store) => store.auth.userData.user);
export const useSignUpSelector = () => useAppSelector((store) => store.auth.signUp);
export const useSettingsSelector = () => useAppSelector((store) => store.settings);
