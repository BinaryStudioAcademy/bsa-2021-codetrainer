import { Auth, GithubAuthService } from './auth';
import { Http } from './http';

const http = new Http();
const authServices = new Auth({ http });
const githubAuthService = new GithubAuthService({ http });

export { authServices, githubAuthService, http };
export { fetchTasksSearch } from './task/tasks-search';
