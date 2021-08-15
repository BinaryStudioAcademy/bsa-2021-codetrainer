import serverFetch from './call-api.helper';
import { GITHUB_API, GithubEndpoints } from 'services/github.service';

export async function redirect(endpoint: GithubEndpoints): Promise<void> {
	const res = await serverFetch({
		endpoint: GITHUB_API + endpoint,
		method: 'GET',
		skipAuthorization: true,
	});
	const { link } = await res.json();
	location.href = link;
}
