namespace WebApi.Entities {
	interface IExample {
		id: string;
		name?: string;
		email?: string;
	}
	interface IUser {
		id: string;
		username: string;
		name: string;
		surname: string;
		email: string;
		rank: number;
		honor: number;
		clan?: string;
		profileClan?: string;
		githubId?: string;
		profileUrl?: string;
	}
}
