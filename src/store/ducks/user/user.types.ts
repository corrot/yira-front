import { IThemeMode } from '@/styled/themes';
import { Action } from '@/types';

export interface IAppState {
	theme: IThemeMode;
}

export interface IThemeSwitchAction extends Action {
	payload: IThemeMode;
}

export interface IAuthProps {
	email: string;
	password: string;
}

export interface IAuthResultData {
	message: string;
	token: string;
}

export interface IRegisterProps {
	email: string;
	password: string;
	repeatPassword: string;
}

export interface IUserState {
	authToken: string | null;
	loginFailed: boolean;
	userId: string;
}

export interface ILoginAction {
	type: string;
	payload: any;
}
