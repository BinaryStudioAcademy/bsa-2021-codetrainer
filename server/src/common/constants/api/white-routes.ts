import { ApiPath, AuthApiPath, GithubApiPath, TestApiPath } from '../../enum';

export const WHITE_ROUTES = [
	`${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
	`${ApiPath.AUTH}${AuthApiPath.REGISTER}`,
	`${ApiPath.AUTH}${AuthApiPath.TOKEN_REFRESH}`,
	`${ApiPath.AUTH}${ApiPath.GITHUB}${GithubApiPath.LOGIN}`,
	`${ApiPath.AUTH}${ApiPath.GITHUB}${GithubApiPath.REGISTER}`,
	`${ApiPath.AUTH}${ApiPath.GITHUB}${GithubApiPath.LINK}`,
	`${ApiPath.AUTH}${ApiPath.GITHUB}${GithubApiPath.CALLBACK}${GithubApiPath.LOGIN}`,
	`${ApiPath.AUTH}${ApiPath.GITHUB}${GithubApiPath.CALLBACK}${GithubApiPath.REGISTER}`,
	`${ApiPath.AUTH}${AuthApiPath.FORGOT_PASSWORD}`,
	`${ApiPath.AUTH}${AuthApiPath.RESET_PASSWORD}`,
	`${ApiPath.TESTS}${TestApiPath.RESULT}`,
];
